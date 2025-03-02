import { notFound } from 'next/navigation'

import SlugPageLayout from '@/components/pages/SlugPageLayout'
import getDirectusPage, { Page } from '@/lib/directusPage'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: Props) {
	const { slug } = await params
	const page: Page = await getDirectusPage(slug)
	if (page.slug.length === 0) {
		notFound()
	}
	return <SlugPageLayout page={page} />
}
