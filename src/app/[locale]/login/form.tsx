'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import AuthForm from '@/components/auth/AuthForm'
import useCustomToast from '@/hooks/useCustomToast'
import useTransitionRefresh from '@/hooks/useTransitionRefresh'
import { routes } from '@/lib/constants'

interface Data {
	email?: string
	password?: string
}

export default function LoginForm() {
	const t = useTranslations()
	const { refresh } = useTransitionRefresh()
	const { successToast } = useCustomToast()
	const router = useRouter()
	const [error, setError] = useState('')

	const handleFormSubmit = async (data: Data) => {
		setError('')
		//console.log('Next auth login with email %s and password %s', data.email, data.password)
		const response = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		})
		if (response && !response.error) {
			successToast(t('LoginPage.successToast'))
			router.push(routes.HOME)
			refresh()
		} else if (response && response.status === 401 && response.error) {
			// 401 Unauthorized
			// next-auth returns a hardcoded string for credentials, so we check for it.
			if (response.error === 'CredentialsSignin') {
				setError(t('LoginPage.invalidCredentials'))
			} else {
				setError(response.error)
			}
		} else {
			setError(t('LoginPage.unknownError'))
		}
	}

	return (
		<>
			<AuthForm title={t('LoginPage.loginHere')} onSubmit={handleFormSubmit} buttonText={t('Navigation.login')} linkDescription={t('LoginPage.newHere')} linkText={t('LoginPage.createAnAccount')} linkHref={routes.REGISTER} linkResetPassword={routes.REQUEST_RESET_PASSWORD} isFullForm={false} error={error} />
		</>
	)
}
