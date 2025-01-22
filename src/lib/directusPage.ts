import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import { notFound } from 'next/navigation'

async function getDirectusPage(slug: string) {
	try {
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
		const page = pages[0]
		return page
	} catch (e: any) {
		console.log(e)
		notFound()
	}
}

export default getDirectusPage
