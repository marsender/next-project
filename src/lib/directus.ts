import getConfig from 'next/config'
import { createDirectus, rest, authentication } from '@directus/sdk'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()
const { url } = publicRuntimeConfig
const { email, password, token } = serverRuntimeConfig
//console.log('Directus url: %s', url)

const directus = createDirectus(url)
	.with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
	.with(rest({ onRequest: (options) => ({ ...options, cache: 'no-store' }) }))

export async function getDirectusClient() {
	//console.log('Email: %s', email)
	if (email && password) {
		await directus.auth.login({ email, password })
	} else if (token) {
		await directus.auth.static(token)
	}

	return directus
}

export default directus
