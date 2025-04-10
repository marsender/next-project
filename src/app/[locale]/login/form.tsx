'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import AuthForm from '@/components/auth/AuthForm'
import useCustomToast from '@/hooks/useCustomToast'
import useTransitionRefresh from '@/hooks/useTransitionRefresh'
import { Link } from '@/i18n/routing'
import { routes } from '@/lib/constants'

interface Data {
	email?: string
	password?: string
}

export default function LoginForm() {
	const { refresh } = useTransitionRefresh()
	const { successToast } = useCustomToast()
	const router = useRouter()
	const [error, setError] = useState('')
	const handleFormSubmit = async (data: Data) => {
		//console.log('Next auth login with email %s and password %s', data.email, data.password)
		const response = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		})
		if (response && !response.error) {
			successToast('Authentication success')
			router.push('/')
			refresh()
		} else if (response && response.status === 401 && response.error) {
			// 401 Unauthorized
			setError(response.error)
		} else {
			setError('Unknown authentication error')
		}
	}

	return (
		<>
			{error && <p>{error}</p>}
			<AuthForm title="Login here" onSubmit={handleFormSubmit} buttonText="Login" linkDescription="New here?" linkText="Create an account" linkHref="/register" isFullForm={false} />
			<div>
				<Link href={routes.REQUEST_RESET_PASSWORD}>Forgot password?</Link>
			</div>
		</>
	)
}
