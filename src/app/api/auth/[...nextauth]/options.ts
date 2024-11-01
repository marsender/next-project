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
				const email = JSON.stringify(credentials?.email)
				const password = JSON.stringify(credentials?.password)
				console.log('Directus login with "%s" - "%s"', email, password)
				// Add logic here to look up the user from the credentials supplied
				const user = await directus.login(email, password)
				if (!user) {
					throw new Error('Email address or password is invalid')
				}
				return user as any
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
			console.log('Next auth signIn message: %s', message)
		},
		/* on signout */
		async signOut(message) {
			console.log('Next auth signOut message: %s', message)
		},
		/* user created */
		async createUser(message) {
			console.log('Next auth createUser message: %s', message)
		},
		/* user updated - e.g. their email was verified */
		async updateUser(message) {
			console.log('Next auth updateUser message: %s', message)
		},
		/* account (e.g. Twitter) linked to a user */
		async linkAccount(message) {
			console.log('Next auth linkAccount message: %s', message)
		},
		/* session is active */
		async session(message) {
			console.log('Next auth session message: %s', message)
		},
	},
}
