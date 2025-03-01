import { readItems } from '@directus/sdk'

import directus, { getLanguageCode } from '@/lib/directus'

interface Page {
	languages_code: string
	slug: string
	title: string
	content: string
	hero: Item
}

const emptyItem: Item = {
	image: '',
}

const emptyPage: Page = {
	languages_code: '',
	slug: '',
	title: '',
	content: '',
	hero: emptyItem,
}

interface Item {
	image: string
}

interface Block {
	item: Item
}

interface Pages {
	id: string
	translations: Page[]
	blocks: Block[]
}

/**
 * Fetch directus page slug for the current locale
 *
 * Usage:
 * const page = await directusPage(slug)
 * then get properties: page.title page.content
 *
 * @returns object with page properties translated or null if error
 */
async function directusPage(slug: string): Promise<Page> {
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
			return emptyPage
		}
		const pages = response[0] as Pages
		console.log('Directus response: %o', pages)
		const block = pages.blocks[0] as Block
		// Access the translations property
		if (pages.translations.length !== 1) {
			return emptyPage
		}
		const page = pages.translations[0] as Page
		page.hero = block.item
		// Return the fetched page
		//console.log('page: %o', page)
		return page
	} catch (error: any) {
		console.log(error)
		return emptyPage
	}
}

export type { Item, Page }
export default directusPage
