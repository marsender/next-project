'use client'

import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { routes } from '@/lib/constants'

import { directusPasswordRequest } from './actions'

export default function RequestResetPasswordForm() {
	const t = useTranslations('RequestResetPasswordForm')
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsSubmitting(true)
		setSuccess('')
		setError('')

		try {
			const formData = new FormData(event.currentTarget)
			const result = await directusPasswordRequest(formData)

			if (result.success) {
				setSuccess(result.success)
			} else if (result.error) {
				setError(result.error)
			}
		} catch (error) {
			console.error('Form submission error:', error)
			setError(t('errorMessage'))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="mt-16 mb-16 flex justify-center bg-gradient-to-br px-4 py-12 sm:px-6 lg:px-8">
			<form
				onSubmit={handleFormSubmit}
				className="bg-background/90 w-full max-w-xl space-y-6 rounded-2xl border border-gray-100 p-8 shadow-xl backdrop-blur"
			>
				<h1 className="text-foreground mb-2 text-center text-3xl font-extrabold tracking-tight">{t('title')}</h1>

				{success && (
					<div className="rounded-lg border border-green-200 bg-green-50 p-4">
						<p className="text-sm font-medium text-green-800">{success}</p>
					</div>
				)}

				{error && (
					<div className="rounded-lg border border-red-200 bg-red-50 p-4">
						<p className="text-sm font-medium text-red-800">{error}</p>
					</div>
				)}

				<p className="text-center text-sm text-gray-600">{t('description')}</p>

				<Input
					type="email"
					placeholder={t('emailPlaceholder')}
					name="email"
					required
					className="w-full rounded-lg border px-4 py-2 shadow-sm transition-shadow focus:ring-2 focus:outline-none"
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 text-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
				>
					{isSubmitting ? t('sendingButton') : t('sendButton')}
				</Button>

				<p className="text-center text-sm text-gray-500">
					{t('rememberPassword')} &nbsp;
					<Link
						href={routes.LOGIN}
						className="text-primary-solid hover:text-primary-solid-hover font-medium transition-colors hover:underline"
					>
						{t('loginPage')}
					</Link>
				</p>
			</form>
		</div>
	)
}
