'use server'

import { readItems } from '@directus/sdk'

import directus, { getLanguageCode } from '@/lib/directus'

interface ItemPage {
	slug: string
	blocks: Blocks[]
	translations: PageTranslation[]
}

interface Blocks {
	collection: string
	item: ItemBlockHero | ItemBlockRichText
}

interface PageTranslation {
	languages_code: string
	slug: string
	title: string
	content: string
}

interface ItemBlockHero {
	image: string
	translations: BlockHero[]
}

interface ItemBlockRichText {
	translations: BlockRichText[]
}

interface BlockHero {
	collection: string
	image: string
	languages_code: string
	buttons?: string
	content: string
	headline: string
}

interface BlockRichText {
	collection: string
	languages_code: string
	content: string
	headline: string
}

interface Page {
	languages_code: string
	slug: string
	title: string
	content: string
	blocks: (BlockHero | BlockRichText)[]
}

const emptyPage: Page = {
	languages_code: '',
	slug: '',
	title: '',
	content: '',
	blocks: [],
}

function filterBlocks(blocks: Blocks[], languageCode: string): (BlockHero | BlockRichText)[] {
	return blocks
		.map((block) => {
			if (block.collection === 'block_hero') {
				const heroBlock = block.item as ItemBlockHero
				const translation = heroBlock.translations.find((t) => t.languages_code === languageCode)
				//console.log('translation: %o', translation)
				return translation ? { ...translation, collection: block.collection, image: heroBlock.image, buttons: translation.buttons ? JSON.parse(translation.buttons) : [] } : null
			}
			if (block.collection === 'block_richtext') {
				const richTextBlock = block.item as ItemBlockRichText
				const translation = richTextBlock.translations.find((t) => t.languages_code === languageCode)
				return translation ? { ...translation, collection: block.collection } : null
			}
			return null
		})
		.filter(Boolean) as (BlockHero | BlockRichText)[]
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

		const response = await directus.request(
			readItems('pages', {
				filter: {
					slug: { _eq: slug },
				},
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
					// blocks: {
					// 	//_filter: { collection: { _eq: 'block_hero' } }, // Reduce the blocks array to only 'block_hero'
					// 	item: {
					// 		translations: {
					// 			_filter: { languages_code: { _eq: languageCode } }, // Keep only 1 translation
					// 		},
					// 	},
					// },
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
		const itemPage = response[0] as ItemPage
		//console.log('Directus itemPage: %o', itemPage)
		// Access the translations property
		if (itemPage.slug != slug || itemPage.translations.length !== 1) {
			return emptyPage
		}
		const itemPageTranslation = itemPage.translations[0] as PageTranslation
		const page: Page = { ...itemPageTranslation, blocks: [] }
		page.blocks = filterBlocks(itemPage.blocks, languageCode)
		// Return the fetched page
		//console.log('Page: %o', page)
		return page
	} catch (error: any) {
		console.log(error)
		return emptyPage
	}
}

export type { BlockHero, BlockRichText, Page }
export default directusPage
