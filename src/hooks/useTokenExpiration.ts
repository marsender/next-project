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
			if (session.error === 'RefreshAccessTokenError') {
				// Token refresh failed, sign out
				handleSignOut()
				return
			}
			// Check expiration time if stored in session
			if (session.accessToken) {
				try {
					const payload = JSON.parse(atob(session.accessToken.split('.')[1]))
					const exp = payload.exp * 1000 // Convert to milliseconds
					if (Date.now() >= exp) {
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
