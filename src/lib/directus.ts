import getConfig from 'next/config'
import { createDirectus, rest } from '@directus/sdk'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()
const { url } = publicRuntimeConfig
//const { email, password, token } = serverRuntimeConfig
console.log('Directus url: %s', url)

const directus = createDirectus(url).with(
	rest({
		onRequest: (options) => ({ ...options, cache: 'no-store' }),
	})
)

export default directus
