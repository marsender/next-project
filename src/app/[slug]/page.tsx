import directus from '@/lib/directus'
import { notFound } from 'next/navigation'
import { readItems } from '@directus/sdk'
import Page from '@/components/pages/Page'

async function getPage(slug: string) {
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

type Params = Promise<{ slug: string }>

export default async function DynamicPage(props: { params: Params }) {
	const params = await props.params
	const slug = params.slug
	const page = await getPage(slug)
	console.log('Directus dynamic page: %o', page)
	return <Page page={page} />
}
