'use server'

import { updateUser } from '@directus/sdk'

import directus from '@/lib/directus'
import { getCurrentUser } from '@/lib/sessions'

export async function updateUserAvatar(formData: FormData) {
	const user = await getCurrentUser()

	if (!user) {
		throw new Error('User not authenticated')
	}

	const file = formData.get('avatar') as File

	if (!file) {
		throw new Error('No file provided')
	}

	try {
		const fileId = await directus.files.createOne(file)

		if (!fileId) {
			throw new Error('File upload failed')
		}

		await directus.users.updateOne(user.id, { avatar: fileId })

		return { success: true }
	} catch (error) {
		console.error('Error updating avatar:', error)
		return { success: false, error: 'Error updating avatar' }
	}
}