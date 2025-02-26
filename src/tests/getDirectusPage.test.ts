import { getLocale } from 'next-intl/server'

import getDirectusPage from '@/lib/directusPage'

const isCI = process.env.CI ? true : false

vi.mock('next/config', () => ({
	default: () => ({
		publicRuntimeConfig: { url: process.env.DIRECTUS_URL }, // Mock Directus URL
	}),
}))

vi.mock('next-intl/server', () => ({
	getLocale: vi.fn(),
}))

describe('getDirectusPage', () => {
	afterAll(() => {
		// Any cleanup logic if necessary
	})

	it('Fetch global translations for the french locale', async () => {
		vi.mocked(getLocale).mockResolvedValue('fr')

		if (isCI) {
			return
		}

		const result = await getDirectusPage('about')

		// Log the result for debugging
		//console.log('Fetched page:', result)

		// You can add assertions based on the expected structure of the result
		expect(result).toBeDefined()
		expect(result).toHaveProperty('id', 2)
		expect(result).toHaveProperty('pages_slug', 'about')
		expect(result).toHaveProperty('languages_code', 'fr-FR')
		expect(result).toHaveProperty('title', 'À propos fr')
		expect(result).toHaveProperty('slug', 'a-propos')
		expect(result).toHaveProperty('hero')
	})
})
