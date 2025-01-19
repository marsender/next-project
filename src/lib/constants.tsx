//import { LogIn, User } from 'lucide-react'

export const routes = {
	HOME: '/',
	LOGIN: '/login',
	LOGOUT: '/logout',
	ACCOUNT: '/account',
	ABOUT: '/about',
}

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
		displayWenAuthenticated: true,
		displayWenUnauthenticated: true,
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
] as const

// Function to get the label for a route key
export function getNavigationLabel(route: string): string | undefined {
	const navigationItem = mainNavigation.find((item) => item.route === route)
	return navigationItem?.label
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
