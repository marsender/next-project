import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export async function getSession() {
	return await getServerSession(authOptions)
}

export async function getCurrentUser() {
	const session = await getSession()

	return session?.user
}

// Unused for now
// import { redirect } from 'next/navigation'
// import { Session } from 'next-auth'
// export async function getCurrentUserOrRedirect(): Promise<Session['user']> {
// 	const user = await getCurrentUser()
// 	if (!user) {
// 		redirect(authOptions.pages!.signIn!)
// 	}
// 	return user
// }
