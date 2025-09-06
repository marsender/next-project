'use server'

import { passwordReset } from '@directus/sdk'
import { getTranslations } from 'next-intl/server'

import directus from '@/lib/directus'

export async function directusPasswordReset(formData: FormData, token: string) {
	const t = await getTranslations('RequestResetForm')
	const newPassword = formData.get('password') as string

	if (!newPassword) {
		return { error: t('passwordRequired') }
	}

	if (!token) {
		return { error: t('tokenRequired') }
	}

	try {
		await directus.request(passwordReset(token, newPassword))
		return { success: t('successMessage') }
	} catch (error) {
		console.error('Password reset error:', error)
		return { error: t('invalidToken') }
	}
}
