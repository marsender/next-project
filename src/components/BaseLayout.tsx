import { ReactNode } from 'react'
import Providers from '@/app/providers'
import '@/app/globals.css'
import { getSession } from '@/lib/sessions'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
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
		<html lang={locale}>
			<head>
				<Script defer data-domain="opale.localhost" src="http://localhost:3012/js/script.js" strategy="afterInteractive" />
			</head>
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
