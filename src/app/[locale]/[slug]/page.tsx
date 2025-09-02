import { notFound } from 'next/navigation'

import SlugPageLayout from '@/components/pages/SlugPageLayout'
import getDirectusPage from '@/lib/directusPage'
import type { Page } from '@/lib/directusPageTypes'

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
