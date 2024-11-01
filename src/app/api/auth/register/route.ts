import { NextResponse } from 'next/server'
import { registerUser } from '@directus/sdk'
import directus from '@/lib/directus'

export async function POST(request: Request) {
	try {
		const { first_name, last_name, email, password } = await request.json()
		const result = await directus.request(registerUser(email, password, { first_name, last_name }))
		return NextResponse.json({ message: 'Account Created!' }, { status: 201 })
	} catch (e: any) {
		console.log(e)
		const code = e.errors[0].extensions.code
		if (code === 'RECORD_NOT_UNIQUE') {
			return NextResponse.json({ message: 'This user already exist' }, { status: 409 })
		}
		return NextResponse.json({ message: 'An unexpected error occurred, please try again' }, { status: 500 })
	}
}
