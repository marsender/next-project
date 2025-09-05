'use server'

import { passwordRequest } from '@directus/sdk'

import directus from '@/lib/directus'

export async function directusPasswordRequest(formData: FormData) {
	const email = formData.get('email') as string

	if (!email) {
		return { error: 'Email is required' }
	}

	try {
		const resetUrl = process.env.NEXT_PUBLIC_URL
		if (!resetUrl) {
			console.error('NEXT_PUBLIC_URL is not set in environment variables.')
			return { error: 'Server configuration error.' }
		}

		await directus.request(passwordRequest(email, `${resetUrl}/reset-password`))

		return { success: 'If you have an account, an email with a password reset link has been sent to your email!' }
	} catch (error) {
		console.error('Password reset request error:', error)
		return { error: 'An error occurred, please try again!' }
	}
}
