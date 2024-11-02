import { LogIn, User } from 'lucide-react'

export const routes = {
	HOME: '/',
	LOGIN: '/login',
	ACCOUNT: '/account',
}

export const mainNavigation = [
	{
		route: routes.HOME,
		label: 'Home',
		requireAuth: false,
	},
	{
		route: routes.ACCOUNT,
		label: 'Account',
		requireAuth: true,
	},
	{
		route: routes.LOGIN,
		label: 'Login',
		requireAuth: false,
	},
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
		subtitle: 'Manage your user account',
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
