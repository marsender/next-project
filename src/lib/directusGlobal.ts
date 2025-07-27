'use server'

import { readItems } from '@directus/sdk'

import directus, { getLanguageCode } from '@/lib/directus'

interface Global {
	languages_code: string
	title: string
	description: string
}

const emptyTranslation: Global = {
	languages_code: '',
	title: '',
	description: '',
}

interface Translations {
	id: string
	translations: Global[]
}

/**
 * Fetch directus global for the current locale
 *
 * Usage:
 * const global = await directusGlobal()
 * then get properties: global.title global.description
 *
 * @returns object with global properties translated or null if error
 */
async function directusGlobal(): Promise<Global> {
	const languageCode = await getLanguageCode()

	try {
		const response = await directus.request(
			readItems('global', {
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
				limit: 1,
			})
		)
		// Convert the respone to Translations
		const unknownResponse: unknown = response
		const translations = unknownResponse as Translations
		// Access the translations property
		if (translations.translations.length !== 1) {
			return emptyTranslation
		}
		const translation = translations.translations[0] as Global
		// Return the fetched translation
		return translation
	} catch (error) {
		console.error('Error fetching global settings:', error)
		return emptyTranslation
	}
}

export type { Global }
export default directusGlobal
