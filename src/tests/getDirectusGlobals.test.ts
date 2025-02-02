import { getLocale } from 'next-intl/server'
import { afterAll, describe, expect, it, vi } from 'vitest'

import getDirectusGlobals from '@/lib/directusGlobals'

vi.mock('next/config', () => ({
	default: () => ({
		publicRuntimeConfig: { url: process.env.DIRECTUS_URL }, // Mock Directus URL
	}),
}))

vi.mock('next-intl/server', () => ({
	getLocale: vi.fn(),
}))

describe('getDirectusGlobals', () => {
	afterAll(() => {
		// Any cleanup logic if necessary
	})

	it('Fetch global translations for the french locale', async () => {
		//;(getLocale as vi.Mock).mockResolvedValue('fr')
		const mockedGetLocale = getLocale as vi.Mock
		mockedGetLocale.mockResolvedValue('fr')

		const result = await getDirectusGlobals()

		// Log the result for debugging
		console.log('Fetched global translations:', result)

		// You can add assertions based on the expected structure of the result
		expect(result).toBeDefined()
		expect(result).toHaveProperty('id', 2)
		expect(result).toHaveProperty('global_id', 1)
		expect(result).toHaveProperty('languages_code', 'fr-FR')
		expect(result).toHaveProperty('title', 'Développement web')
		expect(result).toHaveProperty('description', 'Conception et développement d’applications web')
	})

	// it('should return null if there are no translations', async () => {
	// 	// You may need to set up the Directus API to ensure it returns no translations for this test
	// 	const result = await getDirectusGlobals()

	// 	// Check if the result is null when there are no translations
	// 	expect(result).toBeNull()
	// })

	// it('should return null if there is an error', async () => {
	// 	// You may need to simulate an error condition in the Directus API for this test
	// 	const result = await getDirectusGlobals()

	// 	// Check if the result is null when there is an error
	// 	expect(result).toBeNull()
	// })
})
