'use client'

import { passwordReset } from '@directus/sdk'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { routes } from '@/lib/constants'
import directus from '@/lib/directus'

export default function RequestResetForm({ token }: { token: string }) {
	const [newPassword, setNewPassword] = useState('')
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const reset_token = token
	const router = useRouter()

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			await directus.request(passwordReset(reset_token, newPassword))
			setSuccess('Password successfully reset, redirecting you to login page...')
			setTimeout(() => router.push(routes.LOGIN), 1000)
		} catch (error: any) {
			console.log(error)
			setError('The reset password token is invalid, please request for a new password reset link!')
		}
	}
	return (
		<form onSubmit={handleFormSubmit}>
			<h1>Provide a new password for your account</h1>
			{success && <p>{success}</p>}
			{error && <p>{error}</p>}
			<p>Enter your new password for your account</p>
			<input type="password" placeholder="Enter your new password" name="password" required onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" />
			<button>Create new password</button>
		</form>
	)
}
