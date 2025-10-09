import type { NextAuthOptions, User, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
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
								{ role: ['name'] },
								'email_notifications',
								'last_access',
							],
						}),
					)) as User

					return {
						...user,
						access_token: authData.access_token ?? undefined,
						token_expires: authData.expires_at ?? undefined,
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
	},
	callbacks: {
		async jwt({ token, user }: { token: JWT; user: User }) {
			if (user) {
				token.accessToken = user.access_token
				token.tokenExpires = user.token_expires
				token.user = user
			}
			// Return previous token if the access token has not expired yet
			if (token.tokenExpires && Date.now() < token.tokenExpires) {
				return token
			}
			// Access token has expired, try to update it
			return await refreshAccessToken(token)
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			//console.log('Token: %o', token)
			session.accessToken = token.accessToken as string | undefined
			if (token.user) {
				session.user = token.user as User
				session.error = token.error
			}
			// console.log('Next auth session callback user: %o', user)
			return session
		},
	},
	events: {
		async signIn(message) {
			//console.log('Next auth signIn message: %o', message)
		},
		async signOut(message) {
			//console.log('Next auth signOut message: %o', message)
		},
	},
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		console.log('HERE refreshAccessToken: %o', token)
		// You'll need to implement token refresh logic with Directus
		// This is a simplified example - adjust based on your Directus setup
		const response = await fetch(`${process.env.DIRECTUS_URL}/auth/refresh`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				refresh_token: token.accessToken,
			}),
		})
		const refreshedTokens = await response.json()
		if (!response.ok) {
			throw refreshedTokens
		}
		return {
			...token,
			accessToken: refreshedTokens.access_token,
			tokenExpires: Date.now() + (refreshedTokens.expires ?? 900000),
		}
	} catch (error) {
		// Return a token that will trigger the client to sign out
		return {
			...token,
			error: 'RefreshAccessTokenError',
		}
	}
}
