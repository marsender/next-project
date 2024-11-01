'use client'

import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { customToastOptions } from '@/hooks/useCustomToast'

const locale = 'en'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			{children}
			<Toaster toastOptions={customToastOptions} />
		</SessionProvider>
	)
}
