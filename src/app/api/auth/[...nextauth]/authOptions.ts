import type { Account, NextAuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

import { routes } from '@/lib/constants'
import directus from '@/lib/directus'
import { readMe } from '@directus/sdk'

interface CustomSession extends Session {
	accessToken?: string
	refreshToken?: string
}
interface DirectusUser {
	id: string
	access_token: string
	refresh_token: string
}

/**
 * All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const email: string = credentials?.email ?? ''
				const password: string = credentials?.password ?? ''
				console.log('Directus login with email=%s password=%s', email, password)
				try {
					const authData = await directus.login({ email, password })
					const user = await directus.request(readMe({ fields: ['id'] }))
					return {
						id: user.id,
						access_token: authData.access_token,
						refresh_token: authData.refresh_token,
					} as DirectusUser
				} catch (error) {
					let directusError = 'An unknown authentication error occurred.'
					if (typeof error === 'object' && error !== null && 'errors' in error) {
						const directusErrorObject = error as { errors: { message: string }[] }
						if (directusErrorObject.errors && directusErrorObject.errors.length > 0) {
							directusError = directusErrorObject.errors[0].message
						}
					}
					throw new Error(directusError)
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: routes.LOGIN,
		signOut: routes.LOGOUT,
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/reset-password',
		// newUser: '/new-user', // New users will be directed here on first sign in
	},
	callbacks: {
		async jwt({ token, user, account }: { token: JWT; user: User; account: Account | null }) {
			if (account && user) {
				return {
					...token,
					accessToken: (user as DirectusUser).access_token,
					refreshToken: (user as DirectusUser).refresh_token,
				}
			}
			return token
		},
		async session({ session, token, user }: { session: CustomSession; token: JWT; user: User }) {
			session.accessToken = token.accessToken as string | undefined
			session.refreshToken = token.refreshToken as string | undefined
			if (user) {
				session.user = user
			}
			// console.log('Next auth session callback user: %o', user)
			return session
		},
	},
	events: {
		/* on successful sign in */
		async signIn(message) {
			console.log('Next auth signIn message: %o', message)
		},
		/* on signout */
		async signOut(message) {
			console.log('Next auth signOut message: %o', message)
		},
		/* user created */
		// async createUser(message) {
		// 	console.log('Next auth createUser message: %o', message)
		// },
		/* user updated - e.g. their email was verified */
		// async updateUser(message) {
		// 	console.log('Next auth updateUser message: %o', message)
		// },
		/* session is active */
		// async session(message) {
		// 	console.log('Next auth session message: %o', message)
		// },
	},
}
