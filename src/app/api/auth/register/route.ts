'use server'

import { registerUser } from '@directus/sdk'
import { NextResponse } from 'next/server'
import { getDirectusClient } from '@/lib/directus'

export async function POST(request: Request) {
	try {
		const directus = await getDirectusClient()

		const { first_name, last_name, email, password } = await request.json()
		await directus.request(registerUser(email, password, { first_name, last_name }))
		return NextResponse.json({ message: 'Account Created!' }, { status: 201 })
	} catch (error) {
		console.error(error)
		// Type guard to check if error is an object with an 'errors' property
		if (
			typeof error === 'object' &&
			error !== null &&
			'errors' in error &&
			Array.isArray(error.errors) &&
			error.errors.length > 0 &&
			'extensions' in error.errors[0] &&
			typeof error.errors[0].extensions === 'object' &&
			error.errors[0].extensions !== null &&
			'code' in error.errors[0].extensions
		) {
			const code = (error.errors[0].extensions as { code: string }).code
			if (code === 'RECORD_NOT_UNIQUE') {
				return NextResponse.json({ message: 'This user already exist' }, { status: 409 })
			}
		}
		return NextResponse.json({ message: 'An unexpected error occurred, please try again' }, { status: 500 })
	}
}
