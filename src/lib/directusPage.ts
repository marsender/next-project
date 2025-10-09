'use server'

import { readItems } from '@directus/sdk'
import { getDirectusClient, getLanguageCode } from '@/lib/directus'
import type {
	BlockHero,
	BlockRichText,
	Blocks,
	ItemBlockHero,
	ItemBlockRichText,
	ItemPage,
	Page,
	PageTranslation,
} from '@/lib/directusPageTypes'

const emptyPage: Page = {
	languages_code: '',
	slug: '',
	title: '',
	content: '',
	blocks: [],
}

function filterBlocks(blocks: Blocks[], languageCode: string): (BlockHero | BlockRichText)[] {
	const processedBlocks = blocks.map((block) => {
		if (block.collection === 'block_hero') {
			const heroBlock = block.item as ItemBlockHero
			const translation = heroBlock.translations.find((t) => t.languages_code === languageCode)
			//console.log('translation: %o', translation)
			return translation
				? {
						...translation,
						collection: block.collection,
						image: heroBlock.image,
						buttons: translation.buttons ? JSON.parse(translation.buttons) : [],
					}
				: null
		}
		if (block.collection === 'block_richtext') {
			const richTextBlock = block.item as ItemBlockRichText
			const translation = richTextBlock.translations.find((t) => t.languages_code === languageCode)
			return translation ? { ...translation, collection: block.collection } : null
		}
		return null
	})
	return processedBlocks.filter((block): block is BlockHero | BlockRichText => block !== null)
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
		const directus = await getDirectusClient()

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
			}),
		)

		// The Directus SDK should return an array. If it's not an array, the request likely failed.
		if (!Array.isArray(response)) {
			console.error(
				'Failed to fetch page with slug "%s" from Directus. The API response was not an array as expected.',
				slug,
				'Received:',
				response,
			)
			return emptyPage
		}
		if (response.length !== 1) {
			return emptyPage
		}
		const itemPage = response[0] as ItemPage
		// Access the translations property
		if (itemPage.slug != slug || itemPage.translations.length !== 1) {
			return emptyPage
		}
		const itemPageTranslation = itemPage.translations[0] as PageTranslation
		const page: Page = { ...itemPageTranslation, blocks: [] }
		page.blocks = filterBlocks(itemPage.blocks, languageCode)
		// Return the fetched page
		return page
	} catch (error) {
		// Token expired
		return emptyPage
	}
}

export default directusPage
