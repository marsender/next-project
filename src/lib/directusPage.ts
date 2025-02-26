import { readItems } from '@directus/sdk'

import directus, { getLanguageCode } from '@/lib/directus'

interface Translation {
	languages_code: string
	slug: string
	title: string
	content: string
	hero: Item
}

interface Item {
	image: string
}

interface Block {
	item: Item
}

interface Translations {
	id: string
	translations: Translation[]
	blocks: Block[]
}

/**
 * Fetch directus page slug for the current locale
 *
 * Usage:
 * const page = await getDirectusPage(slug)
 * then get properties: page.title page.content
 *
 * @returns object with page properties translated or null if error
 */
async function getDirectusPage(slug: string): Promise<Translation | null> {
	try {
		const languageCode = await getLanguageCode()

		//const response = await directus.request(readItem('pages', slug))
		const response = await directus.request(
			readItems('pages', {
				deep: {
					translations: {
						_filter: {
							_and: [
								{
									languages_code: { _eq: languageCode },
								},
								{
									pages_slug: { _eq: slug },
								},
							],
						},
					},
					blocks: {
						item: {
							translations: {
								_filter: { languages_code: { _eq: languageCode } },
							},
						},
					},
				},
				fields: [
					'*',
					{ translations: ['*'] },
					{
						blocks: [
							'*',
							{
								item: ['*', { translations: ['*'] }],
							},
						],
					},
				],
				limit: 1,
			})
		)
		if (response.length !== 1) {
			return null
		}
		const translations = response[0] as Translations
		console.log('Directus response: %o', translations)
		const hero = translations.blocks[0] as Block
		// Access the translations property
		if (translations.translations.length !== 1) {
			return null
		}
		const translation = translations.translations[0] as Translation
		translation.hero = hero.item
		// Return the fetched translation
		//console.log('translation: %o', translation)
		return translation
	} catch (error: any) {
		console.log(error)
		return null
	}
}

export default getDirectusPage
