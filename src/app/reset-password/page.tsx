import { redirect } from 'next/navigation'
import ResetPasswordForm from './form'
import { routes } from '@/lib/constants'

export default async function ResetPasswordPage({ searchParams }: { searchParams: { token: string } }) {
	const { token } = searchParams
	if (!token) redirect(routes.LOGIN)
	return (
		<div>
			<ResetPasswordForm token={token} />
		</div>
	)
}
