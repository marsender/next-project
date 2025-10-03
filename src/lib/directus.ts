import { authentication, createDirectus, rest } from '@directus/sdk'
import { getLocale } from 'next-intl/server'

const directusUrl = process.env.DIRECTUS_URL
if (!directusUrl) {
	throw new Error('`DIRECTUS_URL` is not set in your environment variables. Please add it to your `.env.local` file.')
}

// See https://directus.io/docs/guides/connect/sdk
const directus = createDirectus(directusUrl)
	.with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
	.with(rest({ credentials: 'include' }))
//.with(rest({ onRequest: (options) => ({ ...options, cache: 'no-store' }) }))

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
	await directus.login({ email, password })
}

// Directus url must be allowed in NextConfig images remotePatterns
export function getAssetURL(id: string) {
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

export default directus
