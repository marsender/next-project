'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { TokenExpiredError } from '@/lib/errors'
import { useTranslations } from 'next-intl'

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
	const t = useTranslations('Error')

	useEffect(() => {
		if (error instanceof TokenExpiredError || error.name === 'TokenExpiredError') {
			// Automatically sign out the user and redirect to the homepage
			signOut({ callbackUrl: '/' })
		}
	}, [error])

	// For TokenExpiredError, the user will be redirected, so we can show a generic message
	// while the redirection is in progress.
	if (error instanceof TokenExpiredError || error.name === 'TokenExpiredError') {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center">
				<p>{t('session_expired')}</p>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<h2>{t('title')}</h2>
			<p>{t('subtitle')}</p>
		</div>
	)
}