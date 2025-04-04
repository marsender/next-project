import { MetadataRoute } from 'next'

import { routes } from '@/lib/constants'

/**
 * Build the robots file
 * Test via: curl --insecure http://localhost:3002/robots.txt
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [`/en${routes.LOGIN}`, `/fr${routes.LOGIN}`, `/en${routes.REQUEST_RESET_PASSWORD}`, `/fr${routes.REQUEST_RESET_PASSWORD}`],
		},
		sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
	}
}
