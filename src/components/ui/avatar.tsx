'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

import { directusUploadFiles } from '@/lib/directusUploadFiles'
import { Button } from '@/components/ui/button'
import useCustomToast from '@/hooks/useCustomToast'
//import { getAssetURL } from '@/lib/directus'

type Props = {
	className?: string
}

export function Avatar({ className }: Props) {
	const t = useTranslations('AccountPage')
	const { data: session, update } = useSession()
	const [loading, setLoading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const { errorToast } = useCustomToast()

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			const formData = new FormData()
			formData.append('avatar', file)
			setLoading(true)
			try {
				const result = await directusUploadFiles(formData)
				if (result.success) {
					await update() // This will refresh the session
				} else {
					console.error('Avatar upload failed:', result.error)
					errorToast(t('uploadError'))
				}
			} catch (error) {
				console.error('Avatar upload exception:', error)
				errorToast(t('uploadError'))
			} finally {
				setLoading(false)
			}
		}
	}

	//const avatarUrl = session?.user?.image ? getAssetURL(session.user.image) : '/default-avatar.png'
	const avatarUrl = session?.user?.image ? session.user.image : '/default-avatar.png'

	return (
		<div className={`flex items-center space-x-4 ${className}`}>
			<div className="relative h-24 w-24">
				<Image src={avatarUrl} alt="User Avatar" layout="fill" className="rounded-full object-cover" />
			</div>
			<div className="flex flex-col">
				<Button asChild className="mb-2" disabled={loading}>
					<label htmlFor="avatar-upload">{loading ? t('uploading') : t('uploadAvatar')}</label>
				</Button>
				<input
					id="avatar-upload"
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
				/>
				<p className="text-sm text-gray-500">{t('uploadHint')}</p>
			</div>
		</div>
	)
}
