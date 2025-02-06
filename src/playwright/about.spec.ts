import { expect, test } from '@playwright/test'

test.describe('about page', () => {
	test('search text in en page', async ({ page }) => {
		await page.goto('/en/about')
		await expect(page.getByText('About en')).toBeVisible()
	})
	test('search text in fr page', async ({ page }) => {
		await page.goto('/fr/about')
		await expect(page.getByText('À propos fr')).toBeVisible()
	})
})
