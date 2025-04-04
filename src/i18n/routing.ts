import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

import { routes } from '@/lib/constants'

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['en', 'fr'],

	// Used when no locale matches
	defaultLocale: 'en',

	// Make the default lang as root
	localePrefix: 'always',

	pathnames: {
		'/': '/',
		'/login': routes.LOGIN,
		'/logout': routes.LOGOUT,
		'/account': routes.ACCOUNT,
		'/about': {
			en: routes.ABOUT,
			fr: '/a-propos',
		},
		'/request-reset-password': routes.REQUEST_RESET_PASSWORD,
	},
})

export type Locale = (typeof routing.locales)[number]
export type Pathnames = keyof typeof routing.pathnames

// Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
