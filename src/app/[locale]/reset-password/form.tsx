'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { routes } from '@/lib/constants'

import { directusPasswordReset } from './actions'

export default function RequestResetForm({ token }: { token: string }) {
	const t = useTranslations('RequestResetForm')
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const router = useRouter()

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsSubmitting(true)
		setSuccess('')
		setError('')

		try {
			const formData = new FormData(event.currentTarget)
			const result = await directusPasswordReset(formData, token)

			if (result.success) {
				setSuccess(t('successMessage'))
				setTimeout(() => router.push(routes.LOGIN), 1000)
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
				className="w-full max-w-xl space-y-6 rounded-2xl border p-8 shadow-xl backdrop-blur"
			>
				<h1 className="text-foreground mb-6 text-center text-3xl font-extrabold tracking-tight">{t('title')}</h1>

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

				<p className="text-muted-foreground text-center text-sm">{t('description')}</p>

				<Input
					type="password"
					placeholder={t('passwordPlaceholder')}
					name="password"
					required
					autoComplete="new-password"
					className="w-full rounded-lg border px-4 py-2 shadow-sm transition-shadow focus:ring-2 focus:outline-none"
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 text-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
				>
					{isSubmitting ? t('resettingButton') : t('createButton')}
				</Button>
			</form>
		</div>
	)
}
