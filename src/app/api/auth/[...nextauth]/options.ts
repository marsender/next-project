import type { NextAuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import directus from '@/lib/directus'

interface CustomSession extends Session {
	accessToken?: string
	refreshToken?: string
}

/**
 * @see https://next-auth.js.org/configuration/options
 */
export const options: NextAuthOptions = {
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
				//console.log('Directus login with email=%s password=%s', email, password)
				try {
					const user = await directus.login(email, password)
					return user as any
				} catch (error: any) {
					const directusError: string = error.errors && error.errors.length > 0 ? error.errors[0].message : 'Unknown authentication error'
					throw { message: directusError }
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
		// signOut: '/logout',
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/reset-password',
		// newUser: '/new-user', // New users will be directed here on first sign in
	},
	callbacks: {
		async jwt({ token, user, account }: { token: JWT; user: any; account: any }) {
			if (account && user) {
				return {
					...token,
					accessToken: user.access_token,
					refreshToken: user.refresh_token,
				}
			}
			return token
		},
		async session({ session, token }: { session: CustomSession; token: any }) {
			session.accessToken = token.accessToken
			session.refreshToken = token.refreshToken
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
		async createUser(message) {
			console.log('Next auth createUser message: %o', message)
		},
		/* user updated - e.g. their email was verified */
		async updateUser(message) {
			console.log('Next auth updateUser message: %o', message)
		},
		/* account (e.g. Twitter) linked to a user */
		async linkAccount(message) {
			console.log('Next auth linkAccount message: %o', message)
		},
		/* session is active */
		async session(message) {
			console.log('Next auth session message: %o', message)
		},
	},
}
