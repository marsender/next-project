import { redirect } from 'next/navigation'

import { routes } from '@/lib/constants'
import { getSession } from '@/lib/sessions'

import RegistrationForm from './form'

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
	const session = await getSession()
	if (session) {
		redirect(routes.HOME)
	}
	return (
		<div>
			<RegistrationForm />
		</div>
	)
}
