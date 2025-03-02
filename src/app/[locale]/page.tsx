import { notFound } from 'next/navigation'
import HomePage from '@/components/pages/HomePage'
import { getCurrentUser } from '@/lib/sessions'
import getDirectusPage, { Page } from '@/lib/directusPage'
export const dynamic = 'force-dynamic'

export default async function Home() {
	const user = await getCurrentUser()
	const slug: string = 'home'
	const page: Page = await getDirectusPage(slug)
	if (!page.slug.length) {
		notFound()
	}

	return <HomePage page={page} user={user} />
}
