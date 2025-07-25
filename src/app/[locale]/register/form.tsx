'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import AuthForm from '@/components/auth/AuthForm'
import { routes } from '@/lib/constants'

interface Data {
	first_name?: string
	last_name?: string
	email?: string
	password?: string
}

export default function RegistrationForm() {
	const router = useRouter()
	const [error, setError] = useState('')
	const handleFormSubmit = async (data: Data) => {
		const response = await fetch(`/api/auth/register`, {
			method: 'POST',
			body: JSON.stringify({
				...data,
			}),
		})
		switch (response.status) {
			case 201: {
				// Account Created
				router.push('/')
				router.refresh()
				break
			}
			case 409: {
				setError('A user with this email already exist')
				break
			}
			default: {
				setError('An unexpected error occurred, please try again')
				break
			}
		}
	}

	return (
		<>
			{error && <p>{error}</p>}
			<AuthForm title="Register here" onSubmit={handleFormSubmit} buttonText="Register" linkDescription="Already have an account?" linkText="Login" linkHref={routes.LOGIN} />
		</>
	)
}
