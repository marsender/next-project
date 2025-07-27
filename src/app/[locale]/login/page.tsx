import { redirect } from 'next/navigation'

import { routes } from '@/lib/constants'
import { getSession } from '@/lib/sessions'

import LoginForm from './form'

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
	const session = await getSession()
	if (session) {
		redirect(routes.HOME)
	}
	return (
		<div>
			<LoginForm />
		</div>
	)
}
