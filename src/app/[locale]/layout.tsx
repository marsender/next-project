//import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

import BaseLayout from '@/components/BaseLayout'
import { routing } from '@/i18n/routing'
import { getLanguageCode } from '@/lib/directus'

type MetadataProps = {
	params: Promise<{ locale: string }>
}

type RootProps = {
	children: ReactNode
	params: Promise<{ locale: string }>
}

/**
 * Use either metadata or generateMetadata
 *
 * For favicon, see https://stackoverflow.com/questions/75674866/adding-favicon-to-nextjs-app-router-application
 */
export async function generateMetadata({ params }: MetadataProps) {
	const { locale } = await params
	const languageCode = await getLanguageCode()
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	const title = t('title')
	const description = t('description')

	return {
		title: title,
		description,
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [`${process.env.NEXT_PUBLIC_URL}/preview.png`],
		},
		openGraph: {
			title,
			description,
			url: process.env.NEXT_PUBLIC_URL,
			siteName: title,
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_URL}/preview.png`,
					width: 160,
					height: 60,
				},
			],
			locale: languageCode,
			type: 'website',
		},
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
