import Link from 'next/link'
import { FormEvent, useState } from 'react'

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
	isFullForm?: boolean
}

import { useRef } from 'react'

export default function AuthForm({ title, buttonText, onSubmit, linkText, linkHref, linkDescription, isFullForm = true }: AuthFormProps) {
	// Refs to capture input values directly
	const firstNameRef = useRef<HTMLInputElement>(null)
	const lastNameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

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
		<form onSubmit={handleFormSubmit}>
			<h1>{title}</h1>
			{isFullForm && (
				<>
					<input type="text" placeholder="First Name" name="first_name" ref={firstNameRef} required />
					<input type="text" placeholder="Last Name" name="last_name" ref={lastNameRef} required />
				</>
			)}
			<input type="email" placeholder="Email Address" name="email" ref={emailRef} required />
			<input type="password" placeholder="Enter your Password" name="password" ref={passwordRef} required />
			<button>{buttonText}</button>
			<p>
				{linkDescription}
				<Link href={linkHref}>{linkText}</Link>
			</p>
		</form>
	)
}
