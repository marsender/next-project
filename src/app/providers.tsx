'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'

type Props = {
	session: Session | null
	children: ReactNode
}

export default function Providers({ session, children }: Props) {
	return (
		<SessionProvider session={session}>
			{children}
			<Toaster />
		</SessionProvider>
	)
}
