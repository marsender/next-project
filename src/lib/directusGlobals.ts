import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'

interface Translation {
	languages_code: string
	title: string
	description: string
}

interface Global {
	id: string
	translations: Translation[]
}

// Async function to fetch global settings for a specific locale
async function getDirectusGlobals(): Promise<Translation | null> {
	const languageCode = 'en-US'
	//const languageCode = 'fr-FR'

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
