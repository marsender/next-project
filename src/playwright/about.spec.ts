import { expect, test } from '@playwright/test'

test.describe('about page', () => {
	test('search text in en page', async ({ page }) => {
		await page.goto('/en/about')
		await expect(page.getByText('About en')).toBeVisible()
	})
	test('search text in fr page', async ({ page }) => {
		await page.goto('/fr/about')
		await expect(page.getByRole('heading', { name: 'À propos fr' })).toBeVisible()
		await expect(page.getByRole('link', { name: 'À propos' })).toBeVisible()
		await expect(page.getByText('Wysiwyg FR')).toBeVisible()
	})
})
