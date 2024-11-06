import { ReactNode } from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Providers from '@/app/providers'
import '@/app/globals.css'
import { getSession } from '@/lib/sessions'
import Header from '@/components/layout/Header'

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

type Props = {
	children: ReactNode
}

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
		locale: 'en-GB',
		type: 'website',
	},
}

export default async function RootLayout({ children }: Props) {
	const session = await getSession()
	return (
		<html lang="en">
			<body className={`${geistSans.variable} antialiased`}>
				<Providers session={session}>
					<Header user={session?.user} />
					{children}
				</Providers>
			</body>
		</html>
	)
}
