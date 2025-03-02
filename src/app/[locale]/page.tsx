import { notFound } from 'next/navigation'

import HomePage from '@/components/pages/HomePage'
import getDirectusPage, { Page } from '@/lib/directusPage'
import { getCurrentUser } from '@/lib/sessions'
export const dynamic = 'force-dynamic'

export default async function Home() {
	const user = await getCurrentUser()
	const slug: string = 'home'
	const page: Page = await getDirectusPage(slug)
	if (page.slug.length === 0) {
		notFound()
	}

	return <HomePage page={page} user={user} />
}
