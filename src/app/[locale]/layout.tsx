import { ReactNode } from 'react'
//import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Providers from '@/app/providers'
import '@/app/globals.css'
import { getSession } from '@/lib/sessions'
import Header from '@/components/layout/Header'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { setRequestLocale, getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

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

type MetadataProps = {
	params: Promise<{ locale: string }>
}

type RootProps = {
	children: ReactNode
	params: Promise<{ locale: string }>
}

/*
const title = `Opale-concept`
const description = 'Teams knoledge'

export const metadata: Metadata = {
	title: {
		default: title,
		template: '%s | Digest.club',
	},
	description,
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		images: [`${process.env.NEXT_PUBLIC_URL}/vercel.svg`],
	},
	openGraph: {
		title,
		description,
		url: process.env.NEXT_PUBLIC_URL,
		siteName: title,
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_URL}/vercel.svg`,
				width: 1155,
				height: 1000,
			},
		],
		locale: 'en-US',
		type: 'website',
	},
}
*/

// Use either metadata or generateMetadata
export async function generateMetadata({ params }: MetadataProps) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('title'),
	}
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

// RootLayout or LocaleLayout for i18n
export default async function RootLayout({ children, params }: RootProps) {
	const { locale } = await params

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	// Enable static rendering
	setRequestLocale(locale)

	const session = await getSession()
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
