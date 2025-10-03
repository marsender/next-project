import { DefaultSession } from 'next-auth'

/**
 * Extends the default Session interface from next-auth to include the id field on the user object
 */
declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's unique identifier. */
			id: string
		} & DefaultSession['user']
	}
}
