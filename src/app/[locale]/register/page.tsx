import { redirect } from 'next/navigation'
import { getSession } from '@/lib/sessions'
import RegistrationForm from './form'

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
	const session = await getSession()
	if (session) {
		redirect('/')
	}
	return (
		<div>
			<RegistrationForm />
		</div>
	)
}
