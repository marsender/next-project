import '@/app/globals.css'

import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

//import Head from 'next/head'
import Providers from '@/app/providers'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { getSession } from '@/lib/sessions'
//import localFont from 'next/font/local'

type Props = {
	children: ReactNode
	locale: string
}

/*
const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
<body className={`${geistSans.variable} antialiased`}></body>
*/

// const geistMono = localFont({
// 	src: './fonts/GeistMonoVF.woff',
// 	variable: '--font-geist-mono',
// 	weight: '100 900',
// })

export default async function BaseLayout({ children, locale }: Props) {
	const session = await getSession()
	// Provide all messages to the client
	const messages = await getMessages({ locale })

	// if (typeof window === 'undefined') {
	// 	// Server-side logic
	// 	console.log('Server side locale: %s', locale)
	// } else {
	// 	// Client-side logic
	// 	console.log('Client side locale: %s', locale)
	// }

	return (
		<html lang={locale} suppressHydrationWarning>
			<Script defer data-domain="opale-concept.com" src={process.env.VINCEANALYTICS_URL} strategy="afterInteractive" />
			<body>
				<NextIntlClientProvider messages={messages}>
					<Providers session={session}>
						<Header user={session?.user} />
						{children}
						<Footer />
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
