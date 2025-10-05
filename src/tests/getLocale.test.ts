import { getLocale } from 'next-intl/server'

import { getLanguageCode } from '@/lib/directus'

// This test suite performs integration tests against a real Directus database.
// Ensure your test environment is configured to connect to a test Directus instance.

vi.mock('next-intl/server', () => ({
	getLocale: vi.fn(),
}))

describe('getLanguageCode', () => {
	beforeEach(() => {
		// Reset the mock before each test
		vi.clearAllMocks()
	})

	test('should return "fr-FR" when locale is "fr"', async () => {
		vi.mocked(getLocale).mockResolvedValue('fr')
		await expect(getLanguageCode()).resolves.toBe('fr-FR')
	})

	test('should return "en-US" when locale is not "fr"', async () => {
		vi.mocked(getLocale).mockResolvedValue('xx')
		await expect(getLanguageCode()).resolves.toBe('en-US')
	})
})
