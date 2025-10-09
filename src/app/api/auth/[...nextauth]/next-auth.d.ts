import { DefaultSession, User } from 'next-auth'
import { JWT as NextAuthJWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface User {
		id: string
		first_name?: string | null
		last_name?: string | null
		avatar?: string | null
		language?: string | null
		status?: string | null
		email_notifications?: boolean | null
		last_access?: string | null
		access_token?: string
		refresh_token?: string
		token_expires?: number
	}

	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		accessToken?: string
		error?: string
		user: User & DefaultSession['user']
	}
}

declare module 'next-auth/jwt' {
	/**
	 * Returned by the `jwt` callback and `getToken`, when using JWT sessions
	 */
	interface JWT extends NextAuthJWT {
		/** OpenID ID Token */
		idToken?: string
		accessToken?: string
		refreshToken?: string
		tokenExpires?: number
		user?: User
		error?: string
	}
}
