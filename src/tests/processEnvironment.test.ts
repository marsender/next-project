import { describe, it, expect } from 'vitest'

describe('Environment Variables', () => {
	it('should load DIRECTUS_URL from .env.test environment file', () => {
		expect(process.env.DIRECTUS_URL).toBeDefined()
		expect(process.env.DIRECTUS_URL).toBe('https://directus.localhost')
		expect(process.env.DIRECTUS_EMAIL).toBeDefined()
		expect(process.env.DIRECTUS_EMAIL).toBe('admin@opale-concept.com')
	})
})
