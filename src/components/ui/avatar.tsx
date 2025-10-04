'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

import { updateUserAvatar } from '@/actions/update-user-avatar'
import { Button } from '@/components/ui/button'
import { getAssetURL } from '@/lib/directus'

type Props = {
	className?: string
}

export function Avatar({ className }: Props) {
	const t = useTranslations('AccountPage')
	const { data: session, update } = useSession()
	const [loading, setLoading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			const formData = new FormData()
			formData.append('avatar', file)
			setLoading(true)
			try {
				const result = await updateUserAvatar(formData)
				if (result.success) {
					await update() // This will refresh the session
				} else {
					// Handle error, maybe show a toast notification
					console.error(result.error)
				}
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
	}

	const avatarUrl = session?.user?.image ? getAssetURL(session.user.image) : '/default-avatar.png'

	return (
		<div className={`flex items-center space-x-4 ${className}`}>
			<div className="relative h-24 w-24">
				<Image src={avatarUrl} alt="User Avatar" layout="fill" className="rounded-full object-cover" />
			</div>
			<div className="flex flex-col">
				<Button as="label" htmlFor="avatar-upload" className="mb-2" disabled={loading}>
					{loading ? t('uploading') : t('uploadAvatar')}
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