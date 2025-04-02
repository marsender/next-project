import { expect, test } from '@playwright/test'

test.describe('home page', () => {
	test.setTimeout(10_000)
	test('search text in en page', async ({ page }) => {
		await page.goto('/')
		await expect(page.getByRole('heading', { name: 'Web Developer' })).toBeVisible()
		await expect(page.getByRole('link', { name: 'Contact me' })).toBeVisible()
		await expect(page.getByText('Hosting')).toBeVisible()
	})
	test('search text in fr page', async ({ page }) => {
		await page.goto('/fr')
		await expect(page.getByRole('heading', { name: 'Développeur Web' })).toBeVisible()
		await expect(page.getByRole('link', { name: 'Contactez-moi' })).toBeVisible()
		await expect(page.getByText('Hébergement')).toBeVisible()
	})
})
