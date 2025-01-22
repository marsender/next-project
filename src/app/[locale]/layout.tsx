//import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations,setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

import BaseLayout from '@/components/BaseLayout'
import { routing } from '@/i18n/routing'

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

// Generate static routes for all locales (optional)
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

// RootLayout or LocaleLayout for i18n
export default async function RootLayout({ children, params }: Readonly<RootProps>) {
	const { locale } = await params

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	// Enable static rendering
	setRequestLocale(locale)

	return <BaseLayout locale={locale}>{children}</BaseLayout>
}
