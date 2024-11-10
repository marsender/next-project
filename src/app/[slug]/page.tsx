import directus from '@/lib/directus'
import { notFound } from 'next/navigation'
import { readItem } from '@directus/sdk'

async function getPage(slug: string) {
	try {
		const page = await directus.request(readItem('pages', slug))
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
	return (
		<div>
			<h1>{page.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: page.content }}></div>
		</div>
	)
}
