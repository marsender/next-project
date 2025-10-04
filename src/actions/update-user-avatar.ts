'use server'

import { updateUser, uploadFiles } from '@directus/sdk'

import directus from '@/lib/directus'
import { getCurrentUser } from '@/lib/sessions'

export async function updateUserAvatar(formData: FormData) {
	const user = await getCurrentUser()

	if (!user) {
		throw new Error('User not authenticated')
	}

	if (!formData.has('avatar')) {
		throw new Error('No file provided')
	}

	try {
		const uploadResponse = await directus.request(uploadFiles(formData))

		if (!uploadResponse?.id) {
			throw new Error('File upload failed')
		}

		await directus.request(updateUser(user.id, { avatar: uploadResponse.id }))

		return { success: true }
	} catch (error) {
		console.error('Error updating avatar:', error)
		return { success: false, error: 'Error updating avatar' }
	}
}
