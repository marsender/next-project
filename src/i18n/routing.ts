import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import { routes } from '@/lib/constants'

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['en', 'fr'],

	// Used when no locale matches
	defaultLocale: 'en',

	pathnames: {
		'/': '/',
		'/about': {
			en: routes.ABOUT,
			fr: '/apropos',
		},
	},
})

export type Locale = (typeof routing.locales)[number]
export type Pathnames = keyof typeof routing.pathnames

// Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
