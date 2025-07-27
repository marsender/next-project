'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
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
	const t = useTranslations()
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
				router.push(routes.HOME)
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
			<AuthForm title={t('RegistrationPage.registerHere')} onSubmit={handleFormSubmit} buttonText={t('Navigation.register')} linkDescription={t('RegistrationPage.alreadyHaveAnAccount')} linkText={t('Navigation.login')} linkHref={routes.LOGIN} />
		</>
	)
}
