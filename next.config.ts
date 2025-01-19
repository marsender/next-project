import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const parsed = new URL(`${process.env.DIRECTUS_URL}`)
const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig: {
		url: process.env.DIRECTUS_URL,
	},
	serverRuntimeConfig: {
		email: process.env.DIRECTUS_EMAIL,
		password: process.env.DIRECTUS_PASSWORD,
		// token: process.env.DIRECTUS_STATIC_TOKEN,
	},
	// Allow next image to load directus assets
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: parsed.hostname,
				port: '',
				pathname: '/assets/*',
			},
		],
	},
}

export default withNextIntl(nextConfig)
