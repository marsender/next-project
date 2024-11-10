import { redirect } from 'next/navigation'
import ResetPasswordForm from './form'
import { routes } from '@/lib/constants'

type Params = Promise<{ token: string }>

export default async function ResetPasswordPage(props: { params: Params }) {
	const params = await props.params
	const token = params.token
	if (!token) {
		redirect(routes.LOGIN)
	}
	return (
		<div>
			<ResetPasswordForm token={token} />
		</div>
	)
}
