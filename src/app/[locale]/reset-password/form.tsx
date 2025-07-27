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
			setError('')
			setTimeout(() => router.push(routes.LOGIN), 1000)
		} catch (error: any) {
			console.log(error)
			setError('The reset password token is invalid, please request for a new password reset link!')
			setSuccess('')
		}
	}

	return (
		<div className="flex justify-center bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8 mt-16 mb-16">
			<form onSubmit={handleFormSubmit} className="w-full max-w-xl p-8 bg-white/90 backdrop-blur rounded-2xl shadow-xl space-y-6 border border-gray-100">
				<h1 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight mb-2">Provide a new password for your account</h1>

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

				<p className="text-gray-600 text-center text-sm">Enter your new password for your account</p>

				<input type="password" placeholder="Enter your new password" name="password" required onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition-shadow shadow-sm placeholder-gray-400" />

				<button type="submit" className="w-full rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex items-center justify-center gap-2 cursor-pointer shadow-sm bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 text-lg">
					Create new password
				</button>
			</form>
		</div>
	)
}
