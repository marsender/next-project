import { MetadataRoute } from 'next'

import { getPathname, Locale, routing } from '@/i18n/routing'
import { RouteHref,routes } from '@/lib/constants'

/**
 * Build the sitemap
 * Test via: curl http://localhost:3002/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const routesToSkip: RouteHref[] = [routes.LOGIN, routes.LOGOUT, routes.ACCOUNT]

	return Object.values(routes)
		.filter((href) => !routesToSkip.includes(href))
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
