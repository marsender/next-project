import { getLocale } from 'next-intl/server'

import directusGlobal, { Global } from '@/lib/directusGlobal'

const isCI = process.env.CI ? true : false

vi.mock('next/config', () => ({
	default: () => ({
		publicRuntimeConfig: { url: process.env.DIRECTUS_URL }, // Mock Directus URL
	}),
}))

vi.mock('next-intl/server', () => ({
	getLocale: vi.fn(),
}))

describe('directusGlobal', () => {
	afterAll(() => {
		// Any cleanup logic if necessary
	})

	it('Fetch global translations for the french locale', async () => {
		vi.mocked(getLocale).mockResolvedValue('fr')

		if (isCI) {
			return
		}

		const result: Global = await directusGlobal()

		// Log the result for debugging
		//console.log('Fetched global translations:', result)

		// You can add assertions based on the expected structure of the result
		expect(result).toBeDefined()
		expect(result).toHaveProperty('id', 2)
		expect(result).toHaveProperty('global_id', 1)
		expect(result).toHaveProperty('languages_code', 'fr-FR')
		expect(result).toHaveProperty('title', 'Développeur Web Freelance')
		expect(result).toHaveProperty('description', 'Création de sites modernes & performants')
	})

	// it('should return null if there are no translations', async () => {
	// 	// You may need to set up the Directus API to ensure it returns no translations for this test
	// 	const result = await directusGlobal()

	// 	// Check if the result is null when there are no translations
	// 	expect(result).toBeNull()
	// })

	// it('should return null if there is an error', async () => {
	// 	// You may need to simulate an error condition in the Directus API for this test
	// 	const result = await directusGlobal()

	// 	// Check if the result is null when there is an error
	// 	expect(result).toBeNull()
	// })
})
