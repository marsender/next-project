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
export async function getDirectusClient(
	login?: { email: string; password: string } | undefined,
): Promise<DirectusClient<Schema> & RestClient<Schema> & AuthenticationClient<Schema>> {
	const directusUrl = process.env.DIRECTUS_URL
	if (!directusUrl) {
		throw new Error('`DIRECTUS_URL` is not set in your environment variables. Please add it to your `.env.local` file.')
	}

	const user = await getCurrentUser()
	// If the user is authenticated, use their token to make requests on their behalf.
	if (user?.access_token && !login) {
		// Create a new client with authentication capabilities and set the static token.
		// This ensures the returned client matches the AuthenticationClient type.

		const client = createDirectus(directusUrl)
			//.with(authentication('json', { autoRefresh: false }))
			.with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
			.with(staticToken(user.access_token))
			.with(rest())
		directus = client
		return client
	}

	// If we need to login, or if there's no existing static token,
	// we need a client with authentication capabilities.
	// We use a singleton `directus` instance for unauthenticated users to share the connection.
	if (!directus || login) {
		const client = createDirectus(directusUrl)
			.with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
			.with(rest({ credentials: 'include' }))
		if (login) {
			await client.login({ email: login.email, password: login.password })
		}
		directus = client
	}

	return directus
}

export async function getDirectusClientWithTestUser() {
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

	const client = await getDirectusClient({ email: email, password: password })

	return client
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
