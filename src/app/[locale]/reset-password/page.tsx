import { redirect } from 'next/navigation'

import { routes } from '@/lib/constants'

import ResetPasswordForm from './form'

type Props = {
	searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
	const { token } = await searchParams
	if (!token) {
		redirect(routes.LOGIN)
	}
	return (
		<div>
			<ResetPasswordForm token={token} />
		</div>
	)
}
