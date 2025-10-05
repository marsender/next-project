'use server'

import { updateUser, uploadFiles } from '@directus/sdk'
import { getDirectusClient } from '@/lib/directus'
import { getCurrentUser } from '@/lib/sessions'

export async function directusUploadFiles(formData: FormData) {
	try {
		const user = await getCurrentUser()
		if (!user?.id) {
			throw new Error('Upload files: user not authenticated')
		}

		if (!formData.has('avatar')) {
			throw new Error('Upload files: no file provided')
		}

		const directus = await getDirectusClient()
		// https://directus.io/docs/api/files#upload-a-file
		const uploadResponse = await directus.request(uploadFiles(formData))

		if (!uploadResponse?.id) {
			throw new Error('Upload files: file upload failed')
		}

		await directus.request(updateUser(user.id, { avatar: uploadResponse.id }))

		return { success: true }
	} catch (error) {
		console.error('Error updating avatar:', error)
		return { success: false, error: 'Upload files: error updating avatar' }
	}
}
