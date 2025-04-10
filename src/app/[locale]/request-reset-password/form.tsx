'use client'

import { passwordRequest } from '@directus/sdk'
import { FormEvent, useState } from 'react'

import { Link } from '@/i18n/routing'
import { routes } from '@/lib/constants'
import directus from '@/lib/directus'

export default function RequestResetPasswordForm() {
	const [email, setEmail] = useState('')
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const reset_url = `${process.env.NEXT_PUBLIC_URL}/reset-password`

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			await directus.request(passwordRequest(email, reset_url))
			setSuccess('An email with a password reset link has been sent to your email!')
		} catch (error: any) {
			console.log(error)
			if (error) {
				setError('An error occurred, please try again!')
			}
		}
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<h1>Reset your password</h1>
			{success && <p>{success}</p>}
			{error && <p>{error}</p>}
			<p>Enter your registered email and a reset password link will be sent to you</p>
			<input type="email" placeholder="Email Address" name="email" required onChange={(event) => setEmail(event.target.value)} />
			<button>Send Reset Link</button>
			<Link href={routes.LOGIN}>Login page</Link>
		</form>
	)
}
