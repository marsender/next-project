import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

//export { default } from 'next-auth/middleware'
export default createMiddleware(routing)

/**
 * Redirections
 */
export const config = {
	// Run middleware on all relevant routes
	matcher: ['/', '/(fr|en)/:path*'],
}
