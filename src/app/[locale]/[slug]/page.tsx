import { notFound } from 'next/navigation'

import SlugPageLayout from '@/components/pages/SlugPageLayout'
import getDirectusPage, { Page } from '@/lib/directusPage'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: Props) {
	const { slug } = await params
	const page: Page = await getDirectusPage(slug)
	if (!page) {
		console.log('Directus incorrect page slug "%s"', slug)
		notFound()
	}
	//console.log('Directus dynamic page for slug "%s": %o', slug, page)
	return <SlugPageLayout page={page} />
}
