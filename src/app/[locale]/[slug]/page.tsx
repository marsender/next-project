import directus from '@/lib/directus'
import { notFound } from 'next/navigation'
import { readItems } from '@directus/sdk'
import SlugPageLayout from '@/components/pages/SlugPageLayout'

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

type Props = {
	params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: Props) {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) {
		console.log('Directus incorrect page slug "%s"', slug)
		notFound()
	}
	//console.log('Directus dynamic page for slug "%s": %o', slug, page)
	return <SlugPageLayout page={page} />
}
