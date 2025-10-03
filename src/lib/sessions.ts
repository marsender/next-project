import type { Session, User } from 'next-auth'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export async function getSession(): Promise<Session | null> {
	return await getServerSession(authOptions)
}

export async function getCurrentUser(): Promise<User | undefined> {
	const session = await getSession()

	return session?.user as User | undefined
}
