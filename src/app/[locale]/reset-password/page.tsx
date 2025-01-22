import { redirect } from 'next/navigation'

import { routes } from '@/lib/constants'

import ResetPasswordForm from './form'

type Props = {
	params: Promise<{ token: string }>
}

export default async function ResetPasswordPage({ params }: Props) {
	const { token } = await params
	if (!token) {
		redirect(routes.LOGIN)
	}
	return (
		<div>
			<ResetPasswordForm token={token} />
		</div>
	)
}
