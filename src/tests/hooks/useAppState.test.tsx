import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'

import { TANSTACK_USER_STATES_ID, useAppState } from '@/hooks/useAppState'
import messages from '../../../messages/en.json'
import { USER_STATES_COLLECTION, stateService } from '@/lib/directusState'
import { deleteItems, readItems } from '@directus/sdk'
import { getCurrentUser } from '@/lib/sessions' // This is mocked
import { getDirectusClientWithTestUser } from '@/lib/directus'

// This test suite performs integration tests against a real Directus database.
// Ensure your test environment is configured to connect to a test Directus instance.

// Mock the dependencies
vi.mock('next-auth/react')
vi.mock('@/lib/sessions')

const mockUseSession = vi.mocked(useSession)
const mockGetCurrentUser = vi.mocked(getCurrentUser)
const queryClient = new QueryClient({
	defaultOptions: {
		// Disable retries to prevent tests from timing out
		queries: {
			retry: false,
		},
	},
})

// A wrapper component to provide the necessary context (QueryClientProvider)
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<NextIntlClientProvider locale="en" messages={messages}>
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	</NextIntlClientProvider>
)

const directus = await getDirectusClientWithTestUser({ withToken: false })

describe('useAppState', () => {
	const testUserId: string = '3b490daf-9b84-4271-9cf7-38218e702640'
	const testKey: string = 'use-app-state-test-key'
	const mockSession: Session = {
		user: { id: testUserId, name: 'Test User', email: 'test@example.com' },
		expires: '1',
	}

	const mockUser = {
		id: testUserId,
	}

	beforeEach(() => {
		// Reset mocks before each test
		vi.clearAllMocks()
		// Clear the query cache before each test to ensure tests are isolated
		queryClient.clear()
		mockGetCurrentUser.mockResolvedValue(mockUser)
	})

	// Cleanup: delete any states created for this user and key during the tests
	afterEach(async () => {
		const itemsToDelete = await directus.request<{ id: string }[]>(
			readItems(USER_STATES_COLLECTION, {
				filter: {
					user: { _eq: testUserId },
					state_key: { _eq: testKey },
				},
				fields: ['id'],
			}),
		)
		const ids = itemsToDelete.map((item: { id: string }) => item.id)
		if (ids.length > 0) {
			//console.log(`Cleaning up ${ids.length} test state(s)...`)
			await directus.request(deleteItems(USER_STATES_COLLECTION, ids))
		}
	})

	it('should return the default value when the user is not authenticated', async () => {
		mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated', update: vi.fn() })

		const defaultValue: string = 'dark'
		const { result, unmount } = renderHook(() => useAppState(testKey, defaultValue), {
			wrapper,
		})

		await waitFor(() => {
			expect(result.current[0]).toBe(defaultValue)
		})
		unmount()
	})

	it('should fetch and return the user state when authenticated', async () => {
		mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated', update: vi.fn() })

		// Create a state directly so we can test if the hook fetches it.
		const defaultValue: string = 'dark'
		const initialValue: string = 'light'
		await stateService.setUserState(testKey, initialValue)

		// Tell react-query that the initialData is already stale, forcing a refetch
		queryClient.setQueryDefaults([TANSTACK_USER_STATES_ID, testKey], {
			initialDataUpdatedAt: 1, // 1ms epoch time, i.e., very old
		})

		// Runs the useAppState hook with a different default value
		const { result } = renderHook(() => useAppState(testKey, defaultValue), {
			wrapper,
		})

		// The hook initially returns the default value
		expect(result.current[0]).toBe(defaultValue)

		// Wait for the query to resolve, shoud return the initial value
		await waitFor(() => expect(result.current[0]).toBe(initialValue))
	})

	it('should return the default value if fetching state returns null', async () => {
		mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated', update: vi.fn() })

		const defaultValue: string = 'dark'
		const { result } = renderHook(() => useAppState(testKey, defaultValue), {
			wrapper,
		})

		// The hook's value should initially be the default value. We wait to ensure the async
		// query completes but does NOT change the value. We expect this to time out
		// while continuously confirming the value is the default.
		await expect(waitFor(() => expect(result.current[0]).not.toBe(defaultValue))).rejects.toThrow()

		expect(result.current[0]).toBe(defaultValue)
	})

	it('should call setUserState and invalidate queries on mutation', async () => {
		// Start with an existing state
		mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated', update: vi.fn() })

		const defaultValue: string = 'dark'
		const initialValue: string = 'light'
		const { result } = renderHook(() => useAppState(testKey, defaultValue), {
			wrapper,
		})

		// The hook initially returns the default value
		expect(result.current[0]).toBe(defaultValue)

		// Spy on invalidateQueries to ensure it's called, but keep the original implementation,
		// so that the query actually gets refetched.
		const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')

		// Mutate the state using the most recent mutateAsync function from the hook
		await act(async () => {
			const [, setState] = result.current
			await setState(initialValue)
		})

		// Wait for the mutation to be successful
		await waitFor(() => {
			expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: [TANSTACK_USER_STATES_ID, testKey] })
		})

		// Wait for the hook to reflect the new state after the query has been invalidated and refetched.
		await waitFor(() => expect(result.current[0]).toBe(initialValue))

		// Verify the state was actually updated in the database
		const updatedState = await stateService.getUserState(testKey)
		expect(updatedState).toBe(initialValue)
	})
})
