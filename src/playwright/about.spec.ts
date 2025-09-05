import { expect, test } from '@playwright/test'

test.describe('about page', () => {
	test('should display the correct content in English', async ({ page }) => {
		await page.goto('/about')
		// Note: Content is provided by directus, not by the translation files.
		await expect(page.getByRole('heading', { name: 'About en' })).toBeVisible()
		// Note: Content is provided by directus, not by the translation files.
		await expect(page.getByText('Wysiwyg EN')).toBeVisible()
	})
	test('should display the correct content in French', async ({ page }) => {
		await page.goto('/fr/a-propos')
		// Note: Content is provided by directus, not by the translation files.
		await expect(page.getByRole('heading', { name: 'À propos fr' })).toBeVisible()
		// Note: Content is provided by directus, not by the translation files.
		await expect(page.getByText('Wysiwyg FR')).toBeVisible()
	})
})
