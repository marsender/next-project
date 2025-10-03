'use server'

import directus from '@/lib/directus'
import { createItem, readItems, updateItem } from '@directus/sdk'

export const USER_STATES_COLLECTION = 'user_states'

// Represents any valid JSON value.
export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue> | null

// Define the structure of a 'user_states' item in Directus.
interface UserStateItem {
	id: string // The unique identifier for the state item in Directus
	user: string // The ID of the user associated with this state (assuming string UUID or similar)
	state_key: string // The specific key for this state (e.g., 'theme', 'last_visited_page')
	state_value: JSONValue // The actual value of the state, which can be any JSON-compatible value.
}

// The value to set or get can be a string or a json object
export const stateService = {
	async getUserState<T extends JSONValue>(userId: string, key: string): Promise<T | null> {
		try {
			const response = await directus.request<UserStateItem[]>(
				readItems(USER_STATES_COLLECTION, {
					filter: {
						user: { _eq: userId },
						state_key: { _eq: key },
					},
					limit: 1,
				}),
			)

			// The Directus SDK should return an array. If it's not an array, the request likely failed.
			if (!Array.isArray(response)) {
				console.error(
					'Failed to fetch get user state with id "%s" from Directus. The API response was not an array as expected.',
					userId,
					'Received:',
					response,
				)
				return null
			}

			if (response.length !== 1) {
				return null
			}
			const itemUserState = response[0] as UserStateItem
			const { state_value } = itemUserState

			if (typeof state_value === 'string') {
				try {
					return JSON.parse(state_value)
				} catch {
					/* Not a JSON string, return as is */
				}
			}
			return state_value as T
		} catch (error) {
			console.error('Error getting user state:', error)
			return null
		}
	},

	async setUserState<T extends JSONValue>(userId: string, key: string, value: T): Promise<void> {
		try {
			// Check if state exists
			const response = await directus.request<UserStateItem[]>(
				readItems(USER_STATES_COLLECTION, {
					filter: {
						user: { _eq: userId },
						state_key: { _eq: key },
					},
					limit: 1,
				}),
			)

			if (response.length > 0) {
				// Update response
				await directus.request(
					updateItem(USER_STATES_COLLECTION, response[0].id, {
						state_value: value,
					}),
				)
			} else {
				// Create new
				await directus.request(
					createItem(USER_STATES_COLLECTION, {
						user: userId,
						state_key: key,
						state_value: value,
					}),
				)
			}
		} catch (error) {
			console.error('Error setting user state:', error)
		}
	},
}
