'use client'

import { createDirectus, passwordRequest, rest } from '@directus/sdk'
import { FormEvent, useState } from 'react'

import { Link } from '@/i18n/routing'
import { routes } from '@/lib/constants'

interface RequestResetPasswordFormProps {
	directusUrl: string
}

export default function RequestResetPasswordForm({ directusUrl }: RequestResetPasswordFormProps) {
	const [email, setEmail] = useState('')
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const directus = createDirectus(directusUrl).with(rest({ credentials: 'include' }))

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			await directus.request(passwordRequest(email)) //, `${directusUrl}/reset-password`))
			setSuccess('If you have an account, an email with a password reset link has been sent to your email!')
			setError('')
		} catch (error: any) {
			console.log(error)
			if (error) {
				setError('An error occurred, please try again!')
				setSuccess('')
			}
		}
	}

	return (
		<div className="flex justify-center bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8 mt-16 mb-16">
			<form onSubmit={handleFormSubmit} className="w-full max-w-xl p-8 bg-white/90 backdrop-blur rounded-2xl shadow-xl space-y-6 border border-gray-100">
				<h1 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight mb-2">Reset your password</h1>

				{success && (
					<div className="p-4 bg-green-50 border border-green-200 rounded-lg">
						<p className="text-green-800 text-sm font-medium">{success}</p>
					</div>
				)}

				{error && (
					<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-red-800 text-sm font-medium">{error}</p>
					</div>
				)}

				<p className="text-gray-600 text-center text-sm">Enter your registered email and a reset password link will be sent to you</p>

				<input type="email" placeholder="Email Address" name="email" required onChange={(event) => setEmail(event.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition-shadow shadow-sm placeholder-gray-400" />

				<button type="submit" className="w-full rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex items-center justify-center gap-2 cursor-pointer shadow-sm bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 text-lg">
					Send Reset Link
				</button>

				<p className="text-center text-gray-500 text-sm">
					Remember your password? &nbsp;
					<Link href={routes.LOGIN} className="text-blue-600 hover:underline font-medium transition-colors hover:text-blue-800">
						Login page
					</Link>
				</p>
			</form>
		</div>
	)
}
