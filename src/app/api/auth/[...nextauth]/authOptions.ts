import type { NextAuthOptions, User, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { routes } from '@/lib/constants'
import { getDirectusClient } from '@/lib/directus'
import { readMe, refresh } from '@directus/sdk'

// Flag to prevent infinite loop during token refresh
let isRefreshing = 0

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
					// See https://directus.io/docs/guides/auth/email-login
					const authData = await directus.login({ email, password }, { mode: 'json' })
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
						// Convert expires_at to milliseconds timestamp
						token_expires: authData.expires_at ? new Date(authData.expires_at).getTime() : undefined,
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
	},
	callbacks: {
		async jwt({ token, user, trigger, session }: { token: JWT; user?: User; trigger?: string; session?: Session }) {
			// Initial sign in
			if (user) {
				token.accessToken = user.access_token
				token.tokenExpires = user.token_expires
				token.refreshToken = user.refresh_token
				token.user = user
				return token
			}

			console.log('Before trigger: %s', trigger)
			// Handle session updates
			if (trigger === 'update' && session) {
				token.user = { ...token.user, ...session.user }
				return token
			}

			// Skip refresh if already refreshing to prevent infinite loop
			if (isRefreshing === 1) {
				console.log('IsRefreshing: %d', isRefreshing)
				isRefreshing++
			} else if (isRefreshing === 2) {
				console.log('Already refreshing token, returning current token')
				return token
			}

			const delayBeforeTokenExpire = ((token.tokenExpires as number) - Date.now()) / (60 * 1000) - 14
			console.log('Token expire delay: %o', token.tokenExpires, delayBeforeTokenExpire)

			// Check if token needs refresh (with 1 minute buffer)
			const shouldRefresh = !token.tokenExpires || delayBeforeTokenExpire < 0

			if (shouldRefresh) {
				console.log('Token needs refresh, current time:', Date.now(), 'token expires:', token.tokenExpires)
				const refreshToken = await refreshAccessToken(token)
				console.log('NEW refreshToken: %o', refreshToken)
				return refreshToken
			}

			console.log('Token still valid, returning existing token')
			return token
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			session.accessToken = token.accessToken as string | undefined
			session.error = token.error as string | undefined

			if (token.user) {
				session.user = {
					...token.user,
					// Ensure all user properties are properly typed
					id: token.user.id,
					email: token.user.email,
					first_name: token.user.first_name,
					last_name: token.user.last_name,
				} as User
			}

			return session
		},
	},
	events: {
		async signIn(message) {
			console.log('Next auth signIn message: %o', message)
		},
		async signOut(message) {
			console.log('Next auth signOut message: %o', message)
		},
	},
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
	// Set refreshing flag to prevent infinite loop
	if (isRefreshing) {
		console.log('Refresh already in progress, returning current token')
		return token
	}

	isRefreshing = 1
	console.log('Starting token refresh... with %o', token.refreshToken)

	try {
		// Create a new Directus client for the refresh call
		const directus = await getDirectusClient() // { useExisting: false }

		// See https://directus.io/docs/guides/auth/email-login
		// Use the refresh token from the token object
		// Note: Directus SDK's refresh() method should automatically use the stored refresh token
		// But we need to ensure the SDK has access to it
		// const refreshedTokens = await directus.request(
		// 	withOptions(refresh(), {
		// 		body: JSON.stringify({
		// 			refresh_token: token.refreshToken,
		// 		}),
		// 	}),
		// )
		//const refreshedTokens = await directus.request(refresh())
		const refreshedTokens = await directus.request(refresh({ mode: 'json', refresh_token: token.refreshToken }))
		console.log('refreshedTokens: %o', refreshedTokens)

		// console.log('Token refresh successful:', {
		// 	hasAccessToken: !!refreshedTokens.access_token,
		// 	hasRefreshToken: !!refreshedTokens.refresh_token,
		// 	expires: refreshedTokens.expires,
		// })

		// Calculate new expiration time
		// Directus typically returns expires_in in seconds, convert to milliseconds timestamp
		const tokenExpires = Date.now() + (refreshedTokens.expires ?? 900) * 1000

		return {
			...token,
			accessToken: refreshedTokens.access_token ?? undefined,
			tokenExpires: tokenExpires,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fallback to old refresh token if new one not provided
			error: undefined, // Clear any previous errors
		}
	} catch (error) {
		console.error('Failed to refresh access token:', error)

		// Return a token that will trigger the client to sign out
		return {
			...token,
			error: 'RefreshAccessTokenError',
		}
	} finally {
		// Always reset the refreshing flag
		isRefreshing = 0
	}
}
