import { getLocale } from 'next-intl/server'

import directusGlobal from '@/lib/directusGlobal'
import { getCurrentUser } from '@/lib/sessions'
import type { Global } from '@/lib/directusGlobalTypes'

// This test suite performs integration tests against a real Directus database.
// Ensure your test environment is configured to connect to a test Directus instance.

vi.mock('next-intl/server', () => ({
	getLocale: vi.fn(),
}))

vi.mock('@/lib/sessions', () => ({
	getSession: vi.fn(),
	getCurrentUser: vi.fn(),
}))

describe('directusGlobal', () => {
	it('Fetch directus global translations for the french locale', async () => {
		vi.mocked(getLocale).mockResolvedValue('fr')
		vi.mocked(getCurrentUser).mockResolvedValue(undefined)

		const result: Global = await directusGlobal()

		// You can add assertions based on the expected structure of the result
		expect(result).toBeDefined()
		expect(result).toHaveProperty('languages_code', 'fr-FR')
		expect(result).toHaveProperty('title', 'Développeur Web Freelance')
		expect(result).toHaveProperty('description', 'Création de sites modernes & performants')
	})
})
