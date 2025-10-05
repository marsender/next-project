import { authentication, createDirectus, rest, staticToken } from '@directus/sdk'
import { getLocale } from 'next-intl/server'
import type { AuthenticationClient, DirectusClient, RestClient } from '@directus/sdk'
import { getCurrentUser } from './sessions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Schema = any

// See https://directus.io/docs/guides/connect/sdk
let directus: (DirectusClient<Schema> & RestClient<Schema> & AuthenticationClient<Schema>) | null = null

/**
 * Returns a Directus SDK instance.
 * If a user is authenticated, it will use cookie-based authentication to make requests on their behalf.
 * Otherwise, it will use a static token for public/unauthenticated access.
 *
 * @returns The Directus SDK instance.
 */
export async function getDirectusClient() {
	const directusUrl = process.env.DIRECTUS_URL
	if (!directusUrl) {
		throw new Error('`DIRECTUS_URL` is not set in your environment variables. Please add it to your `.env.local` file.')
	}

	const user = await getCurrentUser()
	// If the user is authenticated, use their token to make requests on their behalf.
	if (user?.access_token) {
		// console.log('Authenticated user, using token to create a new Directus client')
		return createDirectus(directusUrl).with(staticToken(user.access_token)).with(rest())
	}

	// If the user is not authenticated, use a new instance of the client with cookie-based authentication.
	// This is important because we don't want to reuse the same instance of the client for all users.
	if (!directus) {
		// console.log('Unauthenticated user, using cookie-based authentication')
		//directus = createDirectus(directusUrl).with(authentication('cookie')).with(rest())
		directus = createDirectus(directusUrl)
			.with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
			.with(rest({ credentials: 'include' }))
	}
	return directus
}

export async function loginWithTestUser() {
	const email = process.env.DIRECTUS_EMAIL
	if (!email) {
		throw new Error(
			'`DIRECTUS_EMAIL` is not set in your environment variables. Please add it to your `.env.test.local` file.',
		)
	}
	const password = process.env.DIRECTUS_PASSWORD
	if (!password) {
		throw new Error(
			'`DIRECTUS_PASSWORD` is not set in your environment variables. Please add it to your `.env.test.local` file.',
		)
	}
	const client = await getDirectusClient()
	await client.login({ email, password })
}

// Directus url must be allowed in NextConfig images remotePatterns
export function getAssetURL(id: string) {
	const directusUrl = process.env.DIRECTUS_URL
	if (!directusUrl) {
		// Or return a fallback URL
		throw new Error('`DIRECTUS_URL` is not set in your environment variables.')
	}
	return `${directusUrl}/assets/${id}`
}

// https://docs.directus.io/reference/files.html
// Unused for now
//import type { AssetsQuery } from '@directus/sdk'
// import { readAssetRaw } from '@directus/sdk'
// export async function readAsset(key: string, query?: AssetsQuery) {
// 	return await directus.request(readAssetRaw(key, query))
// }

const localeToLanguageCode: Record<string, string> = {
	fr: 'fr-FR',
	en: 'en-US',
}

export async function getLanguageCode() {
	const locale = await getLocale()
	// Default to 'en-US' if the locale is not in our map
	return localeToLanguageCode[locale] ?? 'en-US'
}
