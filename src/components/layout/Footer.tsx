'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { memo, PropsWithChildren } from 'react'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'

import Logo from '@/components/layout/Logo'
//import { mainNavigation } from '@/lib/constants'

const ListSection = ({ title, children }: PropsWithChildren & { title: string }) => {
	return (
		<section className="flex h-full flex-1 sm:flex-initial">
			<div className="xs:py-0 py-6">
				<h2 className="text-lg font-bold">{title}</h2>
				<div className="mb-3 h-0.5" />
				<ul className="flex flex-col items-start gap-2 text-sm">{children}</ul>
			</div>
		</section>
	)
}

const Footer = () => {
	const t = useTranslations('Footer')
	const currentYear = new Date().getFullYear()

	return (
		<div className="flex h-full flex-1 flex-col">
			<div className="bg-black px-8 text-white lg:px-4">
				<div className="m-auto max-w-5xl">
					<div className="xs:justify-end flex flex-row justify-start gap-8 py-2">
						{/*<ListSection title="Navigation">
							{mainNavigation.map((item) => (
								<li key={item.route}>
									<Link href={item.route}>{item.label}</Link>
								</li>
							))}
						</ListSection>
						*/}
						<ListSection title={t('networks')}>
							<li>
								<Link href="https://github.com/marsender" target="_blank">
									GitHub
								</Link>
							</li>
							<li>
								<Link href="https://www.linkedin.com/in/marsender" target="_blank">
									LinkedIn
								</Link>
							</li>
						</ListSection>
					</div>
					<div className="flex items-center justify-between border-t border-gray-700 py-6">
						{false ? <Logo className="text-white" /> : null}
						<Link href="https://opale-concept.com/" target="_blank">
							<span className="text-sm">Opale-concept © {currentYear}</span>
						</Link>
						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(Footer)
