'use client'

import { useTranslations } from 'next-intl'
import { FormEvent, useRef } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { RouteHref } from '@/lib/constants'

interface Data {
	first_name?: string
	last_name?: string
	email: string
	password: string
}

interface AuthFormProps {
	title: string
	buttonText: string
	onSubmit: (data: Data) => void
	linkText: string
	linkDescription: string
	linkHref: string
	linkResetPassword?: string
	error?: string
	isFullForm?: boolean
}

export default function AuthForm({
	title,
	buttonText,
	onSubmit,
	linkText,
	linkHref,
	linkResetPassword,
	linkDescription,
	error,
	isFullForm = true,
}: AuthFormProps) {
	const t = useTranslations('AuthForm')
	// Refs to capture input values directly
	const firstNameRef = useRef<HTMLInputElement>(null)
	const lastNameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// Collect values from refs
		const formData = {
			first_name: firstNameRef.current?.value || '',
			last_name: lastNameRef.current?.value || '',
			email: emailRef.current?.value || '',
			password: passwordRef.current?.value || '',
		}
		onSubmit(formData)
	}

	return (
		<div className="mt-16 mb-16 flex justify-center bg-gradient-to-br px-4 py-12 sm:px-6 lg:px-8">
			<form
				onSubmit={handleFormSubmit}
				className="bg-background/90 w-full max-w-xl space-y-6 rounded-2xl border border-gray-100 p-8 shadow-xl backdrop-blur"
			>
				<h1 className="text-foreground mb-6 text-center text-3xl font-extrabold tracking-tight">{title}</h1>
				{error && (
					<div className="rounded-lg border border-red-200 bg-red-50 p-4">
						<p className="text-sm font-medium text-red-800">{error}</p>
					</div>
				)}
				{isFullForm && (
					<div className="flex flex-col gap-4 md:flex-row">
						<Input
							type="text"
							placeholder={t('firstName')}
							containerClassName="w-full"
							name="first_name"
							ref={firstNameRef}
							required
							className="rounded-lg border px-4 py-2 shadow-sm transition-shadow focus:ring-2 focus:outline-none"
						/>
						<Input
							type="text"
							placeholder={t('lastName')}
							containerClassName="w-full"
							name="last_name"
							ref={lastNameRef}
							required
							className="rounded-lg border px-4 py-2 shadow-sm transition-shadow focus:ring-2 focus:outline-none"
						/>
					</div>
				)}
				<Input
					type="email"
					placeholder={t('emailAddress')}
					name="email"
					ref={emailRef}
					required
					className="w-full rounded-lg border px-4 py-2 shadow-sm transition-shadow focus:ring-2 focus:outline-none"
				/>
				<Input
					type="password"
					placeholder={t('enterYourPassword')}
					name="password"
					ref={passwordRef}
					required
					className="w-full rounded-lg border px-4 py-2 shadow-sm transition-shadow focus:ring-2 focus:outline-none"
				/>
				{linkResetPassword && (
					<p className="text-sm text-gray-500">
						<Link
							href={linkResetPassword as RouteHref}
							className="text-primary-solid hover:text-primary-solid-hover font-medium transition-colors hover:underline"
						>
							Forgot password?
						</Link>
					</p>
				)}
				<Button
					type="submit"
					className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 text-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					{buttonText}
				</Button>
				<p className="text-center text-sm text-gray-500">
					{linkDescription} &nbsp;
					<Link
						href={linkHref as RouteHref}
						className="text-primary-solid hover:text-primary-solid-hover font-medium transition-colors hover:underline"
					>
						{linkText}
					</Link>
				</p>
			</form>
		</div>
	)
}
