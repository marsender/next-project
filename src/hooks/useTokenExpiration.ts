import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { routes } from '@/lib/constants'

export const useTokenExpiration = () => {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status !== 'authenticated' || !session) return

		// Check if token has expired
		const checkTokenExpiration = () => {
			console.log('checkTokenExpiration session: %o', session)
			if (session.error === 'RefreshAccessTokenError') {
				// Token refresh failed, sign out
				console.log('checkTokenExpiration: HERE 1')
				handleSignOut()
				return
			}

			// You can also check expiration time if stored in session
			console.log('checkTokenExpiration: accessToken: %o', session.accessToken)
			if (session.accessToken) {
				try {
					const payload = JSON.parse(atob(session.accessToken.split('.')[1]))
					const exp = payload.exp * 1000 // Convert to milliseconds

					console.log('checkTokenExpiration payload: %o', payload)
					if (Date.now() >= exp) {
						console.log('checkTokenExpiration: HERE 3')
						handleSignOut()
					}
				} catch (error) {
					console.error('Error decoding token:', error)
					handleSignOut()
				}
			}
		}

		const handleSignOut = async () => {
			await signOut({ callbackUrl: routes.HOME })
		}

		// Check immediately
		checkTokenExpiration()

		// Set up interval to check every minute
		const interval = setInterval(checkTokenExpiration, 60000)

		return () => clearInterval(interval)
	}, [session, status, router])
}
