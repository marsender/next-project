import directus, { getLanguageCode } from '@/lib/directus'
import { readItems } from '@directus/sdk'

/**
 * Fetch directus page slug for the current locale
 *
 * Usage:
 * const page = await getDirectusPage(slug)
 * then get properties: page.title page.content
 *
 * @returns object with page properties translated or null if error
 */
async function getDirectusPage(slug: string) {
	try {
		//const languageCode = await getLanguageCode()
		//const page = await directus.request(readItem('pages', slug))
		const pages = await directus.request(
			readItems('pages', {
				filter: {
					slug: { _eq: slug },
				},
				fields: [
					'*',
					{
						blocks: [
							'*',
							{
								item: {
									block_hero: ['*'],
									block_richtext: ['*'],
								},
							},
						],
					},
				],
				limit: 1,
			})
		)
		if (pages.length !== 1) {
			return null
		}
		const page = pages[0]
		return page
	} catch (e: any) {
		console.log(e)
		return null
	}
}

export default getDirectusPage
