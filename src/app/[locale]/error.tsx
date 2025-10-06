'use client'

import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { routes } from '@/lib/constants'
import { TokenExpiredError } from '@/lib/errors'

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
	const t = useTranslations('Error')
	const isTokenExpired = error instanceof TokenExpiredError || error.name === 'TokenExpiredError'

	useEffect(() => {
		if (isTokenExpired) {
			// Automatically sign out the user and redirect to the homepage
			signOut({ callbackUrl: routes.HOME })
		}
	}, [isTokenExpired])

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<h2>{isTokenExpired ? t('session_expired_title') : t('title')}</h2>
			<p>{isTokenExpired ? t('session_expired_subtitle') : t('subtitle')}</p>
		</div>
	)
}
