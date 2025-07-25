import { MetadataRoute } from 'next'

import { getPathname, Locale, routing } from '@/i18n/routing'
import { RouteHref, routes } from '@/lib/constants'

/**
 * Build the sitemap
 * Test via: curl --insecure http://localhost:3002/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const routesToSkip: Set<RouteHref> = new Set([routes.LOGIN, routes.REGISTER, routes.LOGOUT, routes.ACCOUNT, routes.REQUEST_RESET_PASSWORD, routes.ABOUT])

	return Object.values(routes)
		.filter((href) => !routesToSkip.has(href))
		.map(getEntry)
}

function getEntry(href: RouteHref) {
	return {
		url: getUrl(href, routing.defaultLocale),
		alternates: {
			languages: Object.fromEntries(routing.locales.map((locale) => [locale, getUrl(href, locale)])),
		},
	}
}

type PathnameHref = Parameters<typeof getPathname>[0]['href']

function getUrl(href: RouteHref, locale: Locale) {
	const pathname = getPathname({ locale, href: href as PathnameHref })
	return process.env.NEXT_PUBLIC_URL + pathname
}
