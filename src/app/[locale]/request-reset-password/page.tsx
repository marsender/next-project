import RequestResetPasswordForm from './form'

export const dynamic = 'force-dynamic'

export default async function RequestPasswordResetPage() {
	return (
		<div>
			<RequestResetPasswordForm />
		</div>
	)
}
