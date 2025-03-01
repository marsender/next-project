describe('Environment Variables', () => {
	test('should load DIRECTUS_URL from .env.test or .env.test.local environment file', () => {
		expect(process.env.DIRECTUS_URL).toBeDefined()
		const url = 'https://directus.opale-concept.com'
		expect(process.env.DIRECTUS_URL).toBe(url)
	})
})
