import { LogIn, User } from 'lucide-react'

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
		label: 'Home',
		displayWenAuthenticated: true,
		displayWenUnauthenticated: true,
	},
	{
		route: routes.ABOUT,
		label: 'About',
		displayWenAuthenticated: true,
		displayWenUnauthenticated: true,
	},
	// {
	// 	route: routes.ACCOUNT,
	// 	label: 'Account',
	// 	displayWenAuthenticated: true,
	// 	displayWenUnauthenticated: false,
	// },
	// {
	// 	route: routes.LOGIN,
	// 	label: 'Login',
	// 	displayWenAuthenticated: false,
	// 	displayWenUnauthenticated: true,
	// },
	// {
	// 	route: routes.LOGOUT,
	// 	label: 'Logout',
	// 	displayWenAuthenticated: true,
	// 	displayWenUnauthenticated: false,
	// },
] as const

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
