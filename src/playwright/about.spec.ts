import { expect, test } from '@playwright/test'

test.describe('about page', () => {
	test('search text in en page', async ({ page }) => {
		await page.goto('/about')
		await expect(page.getByRole('heading', { name: 'About en' })).toBeVisible()
		await expect(page.getByText('Wysiwyg EN')).toBeVisible()
	})
	test('search text in fr page', async ({ page }) => {
		await page.goto('/fr/a-propos')
		await expect(page.getByRole('heading', { name: 'À propos fr' })).toBeVisible()
		await expect(page.getByText('Wysiwyg FR')).toBeVisible()
	})
})
