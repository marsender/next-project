import { redirect } from 'next/navigation'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export async function getSession() {
	return await getServerSession(authOptions)
}

export async function getCurrentUser() {
	const session = await getSession()

	return session?.user
}

export async function getCurrentUserOrRedirect(): Promise<Session['user']> {
	const user = await getCurrentUser()
	if (!user) {
		redirect(authOptions.pages!.signIn!)
	}
	return user
}
