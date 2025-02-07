import { getLocale } from 'next-intl/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getLanguageCode } from '@/lib/directus'

vi.mock('next/config', () => ({
	default: () => ({
		publicRuntimeConfig: { url: process.env.DIRECTUS_URL }, // Mock Directus URL
	}),
}))

vi.mock('next-intl/server', () => ({
	getLocale: vi.fn(),
}))

describe('getLanguageCode', () => {
	beforeEach(() => {
		// Reset the mock before each test
		vi.clearAllMocks()
	})

	it('should return "fr-FR" when locale is "fr"', async () => {
		vi.mocked(getLocale).mockResolvedValue('fr')
		await expect(getLanguageCode()).resolves.toBe('fr-FR')
	})

	it('should return "en-US" when locale is not "fr"', async () => {
		vi.mocked(getLocale).mockResolvedValue('xx')
		await expect(getLanguageCode()).resolves.toBe('en-US')
	})
})
