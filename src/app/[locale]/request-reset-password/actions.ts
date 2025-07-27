'use server'

import { passwordRequest } from '@directus/sdk'

import directus from '@/lib/directus'

export async function directusPasswordRequest(formData: FormData) {
	const email = formData.get('email') as string

	if (!email) {
		return { error: 'Email is required' }
	}

	try {
		await directus.request(passwordRequest(email))

		return { success: 'If you have an account, an email with a password reset link has been sent to your email!' }
	} catch (error: any) {
		console.error('Password reset request error:', error)
		return { error: 'An error occurred, please try again!' }
	}
}
