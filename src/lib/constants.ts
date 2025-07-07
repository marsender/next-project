//import { LogIn, User } from 'lucide-react'

export const routes = {
	HOME: '/' as const,
	ACHIEVEMENTS_AND_PARTNERS: '/achievements-and-partners' as const,
	LOGIN: '/login' as const,
	LOGOUT: '/logout' as const,
	ACCOUNT: '/account' as const,
	ABOUT: '/about' as const,
	REQUEST_RESET_PASSWORD: '/request-reset-password' as const,
}

export type RouteHref = (typeof routes)[keyof typeof routes]

export const mainNavigation = [
	{
		route: routes.HOME,
		label: 'home',
		displayWenAuthenticated: true,
		displayWenUnauthenticated: true,
		displayNavWenAuthenticated: false,
		displayNavWenUnauthenticated: false,
	},
	{
		route: routes.ACHIEVEMENTS_AND_PARTNERS,
		label: 'achievements-and-partners',
		displayWenAuthenticated: true,
		displayWenUnauthenticated: true,
		displayNavWenAuthenticated: false,
		displayNavWenUnauthenticated: false,
	},
	{
		route: routes.LOGIN,
		label: 'login',
		displayWenAuthenticated: false,
		displayWenUnauthenticated: false,
		displayNavWenAuthenticated: false,
		displayNavWenUnauthenticated: false,
	},
	{
		route: routes.ACCOUNT,
		label: 'account',
		displayWenAuthenticated: false,
		displayWenUnauthenticated: false,
		displayNavWenAuthenticated: true,
		displayNavWenUnauthenticated: false,
	},
	{
		route: routes.ABOUT,
		label: 'about',
		displayWenAuthenticated: false, // true,
		displayWenUnauthenticated: false, // true,
		displayNavWenAuthenticated: false,
		displayNavWenUnauthenticated: false,
	},
	{
		route: routes.LOGOUT,
		label: 'logout',
		displayWenAuthenticated: false,
		displayWenUnauthenticated: false,
		displayNavWenAuthenticated: true,
		displayNavWenUnauthenticated: false,
	},
	{
		route: routes.REQUEST_RESET_PASSWORD,
		label: 'request-reset-password',
		displayWenAuthenticated: false,
		displayWenUnauthenticated: false,
		displayNavWenAuthenticated: false,
		displayNavWenUnauthenticated: false,
	},
] as const

// Function to get the label for a route key
export function getNavigationLabel(route: string): string {
	const navigationItem = mainNavigation.find((item) => item.route === route)
	return navigationItem?.label ?? 'no-navigation-label'
}

/*
export type Route = keyof typeof routes

export enum AvailableRoles {
	PUBLISHER = 'publisher',
	ADMIN = 'admin',
}

export enum UserRoles {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	PUBLISHER = 'PUBLISHER',
}

export const PUBLIC_ROUTES = ['/', routes.LOGIN]

export const SETTINGS_ITEMS = [
	{
		id: 'login',
		title: 'Login',
		routePath: routes.LOGIN,
		icon: <LogIn color="red" size={48} />,
		subtitle: 'Login into application',
	},
	{
		id: 'user',
		title: 'User',
		routePath: routes.ACCOUNT,
		icon: <User color="red" size={48} />,
		subtitle: 'Manage your user account',
	},
]

export type TeamSettingsItemsId = (typeof SETTINGS_ITEMS)[number]['id']

export const COOKIES = {
	DEFAULT_TEAM: '__digestclub_default_team',
}

export const FEATURE_FLAGS = {
	hasAITagsGeneration: true,
}
*/
