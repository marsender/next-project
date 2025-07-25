import { redirect } from 'next/navigation'

import { getSession } from '@/lib/sessions'

import RequestResetPasswordForm from './form'

export const dynamic = 'force-dynamic'

export default async function RequestPasswordResetPage() {
	const session = await getSession()
	if (session) {
		redirect('/')
	}
	return (
		<div>
			<RequestResetPasswordForm />
		</div>
	)
}
