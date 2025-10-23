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
 * If a user is authenticated, the token authentication is done
 * Otherwise, the authentication has to be done
 *
 * @returns The Directus SDK instance.
 */
export async function getDirectusClient({ useExisting = true }: { useExisting?: boolean } = {}): Promise<
	DirectusClient<Schema> & RestClient<Schema> & AuthenticationClient<Schema>
> {
	if (useExisting && directus) {
		return directus
	}

	const directusUrl = process.env.DIRECTUS_URL
	if (!directusUrl) {
		throw new Error('`DIRECTUS_URL` is not set in your environment variables. Please add it to your `.env.local` file.')
	}

	// If the user is authenticated, use the token
	if (useExisting) {
		const user = await getCurrentUser()
		if (user?.access_token) {
			//console.log('getDirectusClient with user access token: %o', user)
			directus = createDirectus(directusUrl)
				//.with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
				.with(authentication('json'))
				.with(staticToken(user.access_token))
				// .with(rest({ credentials: 'include' }))
				.with(rest())
			return directus
		}
	}

	directus = createDirectus(directusUrl)
		// .with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
		.with(authentication('json'))
		// .with(rest({ credentials: 'include' }))
		.with(rest())

	return directus
}

export async function getDirectusClientWithTestUser({
	withToken,
}: {
	withToken: boolean
}): Promise<DirectusClient<Schema> & RestClient<Schema>> {
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

	const client = await getDirectusClient({ useExisting: false })
	const authData = await client.login({ email, password }, { mode: 'json' })
	if (!authData?.access_token) {
		throw new Error('`DIRECTUS_ACCESS_TOKEN` is not available.')
	}

	if (withToken) {
		const directusUrl = process.env.DIRECTUS_URL
		if (!directusUrl) {
			throw new Error(
				'`DIRECTUS_URL` is not set in your environment variables. Please add it to your `.env.local` file.',
			)
		}
		return createDirectus(directusUrl).with(staticToken(authData.access_token)).with(rest())
	}

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
