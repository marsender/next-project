'use server'

import { passwordReset } from '@directus/sdk'

import directus from '@/lib/directus'

export async function directusPasswordReset(formData: FormData, token: string) {
	const newPassword = formData.get('password') as string

	if (!newPassword) {
		return { error: 'Password is required' }
	}

	if (!token) {
		return { error: 'Reset token is required' }
	}

	try {
		await directus.request(passwordReset(token, newPassword))
		return { success: 'Password successfully reset!' }
	} catch (error) {
		console.error('Password reset error:', error)
		return { error: 'The reset password token is invalid, please request for a new password reset link!' }
	}
}
