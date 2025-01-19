'use client'

import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { customToastOptions } from '@/hooks/useCustomToast'

type Props = {
	session: any
	children: ReactNode
}

export default function Providers({ session, children }: Props) {
	return (
		<SessionProvider session={session}>
			{children}
			<Toaster toastOptions={customToastOptions} />
		</SessionProvider>
	)
}
