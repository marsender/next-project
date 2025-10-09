'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'

import { useTokenExpiration } from '@/hooks/useTokenExpiration'

function SessionExpirationHandler() {
	useTokenExpiration() // This will handle the token expiration check
	return null
}

type Props = {
	session: Session | null
	children: ReactNode
}

export default function Providers({ session, children }: Props) {
	return (
		<SessionProvider session={session}>
			<SessionExpirationHandler />
			{children}
			<Toaster />
		</SessionProvider>
	)
}
