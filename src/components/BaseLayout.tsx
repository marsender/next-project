import { ReactNode } from 'react'
import localFont from 'next/font/local'
import Providers from '@/app/providers'
import '@/app/globals.css'
import { getSession } from '@/lib/sessions'
import Header from '@/components/layout/Header'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

type RootProps = {
	children: ReactNode
	locale: string
}

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})

// const geistMono = localFont({
// 	src: './fonts/GeistMonoVF.woff',
// 	variable: '--font-geist-mono',
// 	weight: '100 900',
// })

export default async function BaseLayout({ children, locale }: RootProps) {
	const session = await getSession()
	// Provide all messages to the client
	const messages = await getMessages({ locale })

	return (
		<html lang={locale}>
			<head>
				<Script defer data-domain="opale.localhost" src="http://localhost:3012/js/script.js" strategy="afterInteractive" />
			</head>
			<body className={`${geistSans.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<Providers session={session}>
						<Header user={session?.user} />
						{children}
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
