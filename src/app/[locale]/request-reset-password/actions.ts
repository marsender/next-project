'use server'

import { passwordRequest } from '@directus/sdk'
import { getTranslations } from 'next-intl/server'
import { getDirectusClient } from '@/lib/directus'

export async function directusPasswordRequest(formData: FormData) {
	const t = await getTranslations('RequestResetPasswordForm')
	const email = formData.get('email') as string

	if (!email) {
		return { error: t('emailRequired') }
	}

	try {
		const resetUrl = process.env.NEXT_PUBLIC_URL
		if (!resetUrl) {
			console.error('NEXT_PUBLIC_URL is not set in environment variables.')
			return { error: t('serverError') }
		}
		console.log('Reset url: %s', `${resetUrl}/reset-password`)
		const directus = await getDirectusClient()
		await directus.request(passwordRequest(email, `${resetUrl}/reset-password`))

		return { success: t('successMessage') }
	} catch (error) {
		console.error('Password reset request error:', error)
		return { error: t('errorMessage') }
	}
}
