import HomePage from '@/components/pages/HomePage'
import { getCurrentUser } from '@/lib/sessions'
export const dynamic = 'force-dynamic'

export default async function Home() {
	const user = await getCurrentUser()

	return <HomePage user={user} />
}
