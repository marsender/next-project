import type { AssetsQuery } from '@directus/sdk'
import { authentication, createDirectus, readAssetRaw, rest } from '@directus/sdk'
import getConfig from 'next/config'
import { getLocale } from 'next-intl/server'

const { publicRuntimeConfig } = getConfig()
//const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()
const { url } = publicRuntimeConfig
//const { email, password, token } = serverRuntimeConfig
//console.log('Directus url: %s', url)

const directus = createDirectus(url)
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

export function getDirectusURL(): string {
	return (
		process.env.DIRECTUS_URL ??
		(() => {
			throw new Error('DIRECTUS_URL is not defined in the environment variables')
		})()
	)
}

// Directus url must be allowed in NextConfig images remotePatterns
export function getAssetURL(id: string) {
	return `${process.env.DIRECTUS_URL}/assets/${id}`
}

// https://docs.directus.io/reference/files.html
export async function readAsset(key: string, query?: AssetsQuery) {
	return await directus.request(readAssetRaw(key, query))
}

export async function getLanguageCode() {
	const locale = getLocale()
	return (await locale) === 'fr' ? 'fr-FR' : 'en-US'
}

export default directus
