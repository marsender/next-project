import { readItems } from '@directus/sdk'

import directus, { getLanguageCode } from '@/lib/directus'

interface Translation {
	languages_code: string
	title: string
	description: string
}

interface Translations {
	id: string
	translations: Translation[]
}

/**
 * Fetch directus global for the current locale
 *
 * Usage:
 * const global = await getDirectusGlobals()
 * then get properties: global?.title global?.description
 *
 * @returns object with global properties translated or null if error
 */
async function getDirectusGlobals(): Promise<Translation | null> {
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
			return null
		}
		const translation = translations.translations[0] as Translation
		// Return the fetched translation
		return translation
	} catch (error) {
		console.error('Error fetching global settings:', error)
		return null
	}
}

export type { Translation }
export default getDirectusGlobals
