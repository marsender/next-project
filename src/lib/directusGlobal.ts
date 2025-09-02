'use server'

import { readSingleton } from '@directus/sdk'

import directus, { getLanguageCode } from '@/lib/directus'
import type { Global, Translations } from '@/lib/directusGlobalTypes'

const emptyTranslation: Global = {
	languages_code: '',
	title: '',
	description: '',
}

/**
 * Fetch directus global for the current locale
 *
 * Usage:
 * const global = await directusGlobal()
 * then get properties: global.title global.description
 *
 * @returns object with global properties translated or an empty object if an error occurs.
 */
async function directusGlobal(): Promise<Global> {
	try {
		const languageCode = await getLanguageCode()

		const globalItem = await directus.request<Translations>(
			readSingleton('global', {
				deep: {
					translations: {
						_filter: {
							languages_code: {
								_eq: languageCode,
							},
						},
					},
				},
				fields: ['*', { translations: ['*'] }],
			})
		)

		if (!globalItem) {
			console.error('Failed to fetch global settings from Directus. The API response was empty.')
			return emptyTranslation
		}

		if (!globalItem.translations || globalItem.translations.length !== 1) {
			console.error(`Error fetching global settings: Expected 1 translation, but got ${globalItem.translations?.length}.`)
			return emptyTranslation
		}
		return globalItem.translations[0]
	} catch (error) {
		console.error('Error fetching global settings:', error)
		return emptyTranslation
	}
}

export default directusGlobal
