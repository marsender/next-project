import { expect, test } from '@playwright/test'

import en from '../../messages/en.json'
import fr from '../../messages/fr.json'

test.describe('home page', () => {
	test('should display the correct content in English', async ({ page }) => {
		await page.goto('/')
		// Note: Content is provided by directus, not by the translation files.
		await expect(page.getByRole('heading', { name: 'Freelance Web Developer' })).toBeVisible()
		await expect(page.getByRole('link', { name: en.Hero.contactMe })).toBeVisible()
		// Note: Content is provided by directus, not by the translation files.
		await expect(page.getByText('Hosting')).toBeVisible()
	})
	test('should display the correct content in French', async ({ page }) => {
		await page.goto('/fr')
		// Note: Content is provided by directus, not by the translation files.
		await expect(page.getByRole('heading', { name: 'Développeur Web Freelance' })).toBeVisible()
		await expect(page.getByRole('link', { name: fr.Hero.contactMe })).toBeVisible()
		// Note: Content is provided by directus, not by the translation files.
		await expect(page.getByText('Hébergement')).toBeVisible()
	})
})
