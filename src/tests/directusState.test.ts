import { createItem, deleteItems, readItems } from '@directus/sdk'
import { getDirectusClient, loginWithTestUser } from '@/lib/directus'
import { USER_STATES_COLLECTION, stateService } from '@/lib/directusState'
import { getCurrentUser } from '@/lib/sessions'
import { User } from 'next-auth'

// This test suite performs integration tests against a real Directus database.
// Ensure your test environment is configured to connect to a test Directus instance.

vi.mock('@/lib/sessions')
const mockGetCurrentUser = vi.mocked(getCurrentUser)

describe('stateService', () => {
	// Use a valid test user ID
	const testUserId: string = '3b490daf-9b84-4271-9cf7-38218e702640'
	const testKey: string = 'state-service-test-key'
	const createdStateIds: string[] = []

	const mockUser: User = {
		id: testUserId,
	}

	beforeAll(async () => {
		// These tests will pass with authenticated users only
		await loginWithTestUser()
	})

	afterAll(async () => {
		// Cleanup: delete any states created during the tests.
		if (createdStateIds.length > 0) {
			const directus = await getDirectusClient()
			//console.log(`Cleaning up ${createdStateIds.length} test state(s)...`)
			await directus.request(deleteItems(USER_STATES_COLLECTION, createdStateIds))
		}
	})

	beforeEach(() => {
		mockGetCurrentUser.mockResolvedValue(mockUser)
	})

	it('should return null when getting a state that does not exist', async () => {
		mockGetCurrentUser.mockResolvedValue(mockUser)
		const state = await stateService.getUserState('non-existent-key')
		expect(state).toBeNull()
	})

	it('should create a new state, read it, and then update it', async () => {
		const initialValue: string = 'dark'
		const updatedValue: string = 'light'

		// 1. Create the state
		await stateService.setUserState(testKey, initialValue)

		// 2. Read the state and verify its initial value
		const stateAfterCreate = await stateService.getUserState(testKey)
		expect(stateAfterCreate).toBe(initialValue)

		// Add the ID to the cleanup array. We need to fetch it first.
		const directus = await getDirectusClient()
		const createdItems = await directus.request<{ id: string }[]>(
			readItems(USER_STATES_COLLECTION, {
				filter: { user: { _eq: testUserId }, state_key: { _eq: testKey } },
				fields: ['id'],
			}),
		)
		if (createdItems[0]?.id) {
			createdStateIds.push(createdItems[0].id)
		}

		// 3. Update the state
		await stateService.setUserState(testKey, updatedValue)

		// 4. Read the state again and verify the updated value
		const stateAfterUpdate = await stateService.getUserState(testKey)
		expect(stateAfterUpdate).toBe(updatedValue)
	})

	it('should handle complex objects as state values', async () => {
		const complexKey: string = 'user-preferences'
		const complexValue = { notifications: true, layout: 'compact' }

		// Create the state directly to get its ID for cleanup
		const directus = await getDirectusClient()
		const createdState = await directus.request<{ id: string }>(
			createItem(USER_STATES_COLLECTION, {
				user: testUserId,
				state_key: complexKey,
				state_value: complexValue,
			}),
		)
		createdStateIds.push(createdState.id)

		// Retrieve the state using the service
		const state = await stateService.getUserState(complexKey)

		expect(state).toEqual(complexValue)
	})

	it('should not throw an error if the API fails, but return null', async () => {
		// Mock that no user is logged in
		mockGetCurrentUser.mockResolvedValue(undefined)
		const result = await stateService.getUserState('any-key')
		expect(result).toBeNull()
	})
})
