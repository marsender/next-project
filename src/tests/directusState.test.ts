import directus from '@/lib/directus'
import { USER_STATES_COLLECTION, stateService } from '@/lib/directusState'
import { createItem, deleteItems, readItems } from '@directus/sdk'

// This test suite performs integration tests against a real Directus database.
// Ensure your test environment is configured to connect to a test Directus instance.

vi.mock('next/config', () => ({
	default: () => ({
		publicRuntimeConfig: { url: process.env.DIRECTUS_URL }, // Mock Directus URL
	}),
}))

describe('stateService', () => {
	// Use a valid test user ID
	const testUserId: string = '3b490daf-9b84-4271-9cf7-38218e702640' // `test-user-${Date.now()}`
	const testKey: string = 'state-service-test-key'
	const createdStateIds: string[] = []

	// Cleanup: delete any states created during the tests.
	afterAll(async () => {
		if (createdStateIds.length > 0) {
			console.log(`Cleaning up ${createdStateIds.length} test state(s)...`)
			await directus.request(deleteItems(USER_STATES_COLLECTION, createdStateIds))
		}
	})

	it('should return null when getting a state that does not exist', async () => {
		const state = await stateService.getUserState(testUserId, 'non-existent-key')
		expect(state).toBeNull()
	})

	it('should create a new state, read it, and then update it', async () => {
		const initialValue: string = 'dark'
		const updatedValue: string = 'light'

		// 1. Create the state
		await stateService.setUserState(testUserId, testKey, initialValue)

		// 2. Read the state and verify its initial value
		const stateAfterCreate = await stateService.getUserState(testUserId, testKey)
		expect(stateAfterCreate).toBe(initialValue)

		// Add the ID to the cleanup array. We need to fetch it first.
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
		await stateService.setUserState(testUserId, testKey, updatedValue)

		// 4. Read the state again and verify the updated value
		const stateAfterUpdate = await stateService.getUserState(testUserId, testKey)
		expect(stateAfterUpdate).toBe(updatedValue)
	})

	it('should handle complex objects as state values', async () => {
		const complexKey: string = 'user-preferences'
		const complexValue = { notifications: true, layout: 'compact' }

		// Create the state directly to get its ID for cleanup
		const createdState = await directus.request<{ id: string }>(
			createItem(USER_STATES_COLLECTION, {
				user: testUserId,
				state_key: complexKey,
				state_value: complexValue,
			}),
		)
		createdStateIds.push(createdState.id)

		// Retrieve the state using the service
		const state = await stateService.getUserState(testUserId, complexKey)

		expect(state).toEqual(complexValue)
	})

	it('should not throw an error if the API fails, but return null', async () => {
		// This test assumes an invalid user ID will cause a permissions error or similar failure
		// but the service should catch it and return null.
		const result = await stateService.getUserState('invalid-user-id-that-will-fail', 'any-key')
		expect(result).toBeNull()
	})
})
