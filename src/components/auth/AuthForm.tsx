'use client'

import { useTranslations } from 'next-intl'
import { FormEvent, useRef } from 'react'

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
	isFullForm?: boolean
}

export default function AuthForm({ title, buttonText, onSubmit, linkText, linkHref, linkResetPassword, linkDescription, isFullForm = true }: AuthFormProps) {
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
		<div className="flex justify-center bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8 mt-16 mb-16">
			<form onSubmit={handleFormSubmit} className="w-full max-w-xl p-8 bg-white/90 backdrop-blur rounded-2xl shadow-xl space-y-6 border border-gray-100">
				<h1 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight mb-2">{title}</h1>
				{isFullForm && (
					<div className="flex flex-col md:flex-row gap-4">
						<input type="text" placeholder={t('firstName')} name="first_name" ref={firstNameRef} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition-shadow shadow-sm placeholder-gray-400" />
						<input type="text" placeholder={t('lastName')} name="last_name" ref={lastNameRef} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition-shadow shadow-sm placeholder-gray-400" />
					</div>
				)}
				<input type="email" placeholder={t('emailAddress')} name="email" ref={emailRef} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition-shadow shadow-sm placeholder-gray-400" />
				<input type="password" placeholder={t('enterYourPassword')} name="password" ref={passwordRef} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition-shadow shadow-sm placeholder-gray-400" />
				{linkResetPassword && (
					<p className="text-gray-500 text-sm">
						<Link href={linkResetPassword as RouteHref} className="text-blue-600 hover:underline font-medium transition-colors hover:text-blue-800">
							Forgot password?
						</Link>
					</p>
				)}
				<button type="submit" className="w-full rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex items-center justify-center gap-2 cursor-pointer shadow-sm bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 text-lg">
					{buttonText}
				</button>
				<p className="text-center text-gray-500 text-sm">
					{linkDescription} &nbsp;
					<Link href={linkHref as RouteHref} className="text-blue-600 hover:underline font-medium transition-colors hover:text-blue-800">
						{linkText}
					</Link>
				</p>
			</form>
		</div>
	)
}
