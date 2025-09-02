import type { AssetsQuery } from '@directus/sdk'
import { authentication, createDirectus, readAssetRaw, rest } from '@directus/sdk'
import { getLocale } from 'next-intl/server'

const directusUrl = process.env.DIRECTUS_URL
if (!directusUrl) {
	throw new Error('`DIRECTUS_URL` is not set in your environment variables. Please add it to your `.env.local` file.')
}

const directus = createDirectus(directusUrl)
	.with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
	.with(rest({ credentials: 'include' }))
//.with(rest({ onRequest: (options) => ({ ...options, cache: 'no-store' }) }))

// Unused func
// https://docs.directus.io/blog/implement-directus-auth-in-next-js-14.html
/*
export async function getDirectusClient() {
	if (email && password) {
		console.log('Directus server auth with email: %s', email)
		//await directus.auth.login({ email, password })
		await directus.request(registerUser(email, password))
	} else if (token) {
		console.log('Directus server auth with token: %s', email)
		//await directus.auth.static(token)
		await directus.request(
			withToken(
				token,
				readMe({
					fields: ['*'],
				})
			)
		)
	}

	return directus
}
*/

// Directus url must be allowed in NextConfig images remotePatterns
export function getAssetURL(id: string) {
	return `${directusUrl}/assets/${id}`
}

// https://docs.directus.io/reference/files.html
export async function readAsset(key: string, query?: AssetsQuery) {
	return await directus.request(readAssetRaw(key, query))
}

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
