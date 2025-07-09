import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

import { routes } from '@/lib/constants'

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['en', 'fr'],

	// Used when no locale matches
	defaultLocale: 'en',

	// Make the default lang as root
	localePrefix: 'as-needed',

	pathnames: {
		'/': '/',
		'/achievements': {
			en: routes.ACHIEVEMENTS,
			fr: '/realisations',
		},
		'/about': {
			en: routes.ABOUT,
			fr: '/a-propos',
		},
		'/login': routes.LOGIN,
		'/logout': routes.LOGOUT,
		'/account': routes.ACCOUNT,
		'/request-reset-password': routes.REQUEST_RESET_PASSWORD,
	},
})

/**
 * Get the en route path from any localised route
 *
 * @param pathName A route path
 * @returns
 */
function getEnPathname(pathName: string): string {
	for (const key of Object.keys(routing.pathnames) as Array<keyof typeof routing.pathnames>) {
		const value = routing.pathnames[key]
		if (typeof value === 'object') {
			const localized = value as Record<string, string>
			for (const lang in localized) {
				if (localized[lang] === pathName) {
					return value.en
				}
			}
		}
	}
	return pathName
}

export function isRouteActive(pathName: string, route: string): boolean {
	// If the first part of the path is a locale, remove it
	const segments = pathName.split('/').filter(Boolean)
	if (segments.length > 0 && (routing.locales as readonly string[]).includes(segments[0])) {
		segments.shift()
	}
	const normalizedPath = getEnPathname('/' + segments.join('/'))
	//console.log('Tests: pathName=%s normalizedPath=%s route=%s', pathName, normalizedPath, route)
	return normalizedPath === route
}

export type Locale = (typeof routing.locales)[number]
//export type Pathnames = keyof typeof routing.pathnames

// Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
