import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import { getLocale } from 'next-intl/server'

interface Translation {
	languages_code: string
	title: string
	description: string
}

interface Global {
	id: string
	translations: Translation[]
}

// Fetch directus global for the current locale
async function getDirectusGlobals(): Promise<Translation | null> {
	const locale = getLocale()
	const languageCode = (await locale) === 'en' ? 'en-US' : 'fr-FR'

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
		// Convert the respone to Global
		const unknownResponse: unknown = response
		const globalSettings = unknownResponse as Global
		// Access the translations property
		if (globalSettings.translations.length !== 1) {
			return null
		}
		const translation = globalSettings.translations[0]
		// Return the fetched global settings
		return translation as Translation
	} catch (error) {
		console.error('Error fetching global settings:', error)
		return null
	}
}

export type { Translation }
export default getDirectusGlobals
