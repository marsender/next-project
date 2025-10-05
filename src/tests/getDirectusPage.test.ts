import { getLocale } from 'next-intl/server'

import directusPage from '@/lib/directusPage'
import { getCurrentUser } from '@/lib/sessions'

// This test suite performs integration tests against a real Directus database.
// Ensure your test environment is configured to connect to a test Directus instance.

vi.mock('next-intl/server', () => ({
	getLocale: vi.fn(),
}))

vi.mock('@/lib/sessions', () => ({
	getSession: vi.fn(),
	getCurrentUser: vi.fn(),
}))

describe('directusPage', () => {
	it('Fetch directus page for the french locale', async () => {
		vi.mocked(getLocale).mockResolvedValue('fr')
		vi.mocked(getCurrentUser).mockResolvedValue(undefined)

		const result = await directusPage('about')

		// You can add assertions based on the expected structure of the result
		expect(result).toBeDefined()
		expect(result).toHaveProperty('slug', 'a-propos')
		expect(result).toHaveProperty('languages_code', 'fr-FR')
		expect(result).toHaveProperty('title', 'À propos fr')
		expect(result).toHaveProperty('content')
		expect(result).toHaveProperty('blocks')
	})
})
