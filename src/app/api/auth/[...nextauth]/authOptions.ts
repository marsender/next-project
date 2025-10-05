import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { routes } from '@/lib/constants'
import { getDirectusClient } from '@/lib/directus'
import { readMe } from '@directus/sdk'

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
				console.log('Directus login attempt with email=%s', email)
				try {
					const directus = await getDirectusClient()
					const authData = await directus.login({ email, password })
					const user = (await directus.request(
						readMe({
							fields: [
								'id',
								'first_name',
								'last_name',
								'email',
								'avatar',
								'language',
								'status',
								'email_notifications',
								'last_access',
							],
						}),
					)) as User
					// On successful authorization, return the user object from Directus
					// along with the tokens. This object is passed to the `jwt` callback.
					return {
						...user,
						access_token: authData.access_token ?? undefined,
						refresh_token: authData.refresh_token ?? undefined,
					}
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
		async jwt({ token, user }) {
			// The user object is only passed on the first call after sign-in
			if (user) {
				token.id = user.id
				token.accessToken = user.access_token
				token.refreshToken = user.refresh_token
				// Persist the user properties from Directus in the token
				token.user = user
			}
			return token
		},
		async session({ session, token }) {
			// The session object is what the client-side and server components will see.
			// We are taking the user data from the token and putting it into the session.
			if (token && session.user) {
				session.user = token.user as User
				// You can also expose tokens to the session if needed for client-side API calls
				// session.accessToken = token.accessToken as string;
				// session.refreshToken = token.refreshToken as string;
			}
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
