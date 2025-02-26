'use client'

import Link from 'next/link'
import { memo, PropsWithChildren } from 'react'

import Logo from '@/components/layout/Logo'
import { mainNavigation } from '@/lib/constants'

const ListSection = ({ title, children }: PropsWithChildren & { title: string }) => {
	return (
		<section className="flex h-full flex-1 sm:flex-initial">
			<div className="py-6 xs:py-0">
				<h2 className="font-bold text-lg">{title}</h2>
				<div className="bg-white h-0.5 mb-3" />
				<ul className="flex flex-col items-start gap-2 text-sm">{children}</ul>
			</div>
		</section>
	)
}

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className="flex-1 flex flex-col h-full">
			<div className="bg-black py-12 text-white px-8 lg:px-4">
				<div className="max-w-5xl flex flex-col m-auto xs:flex-row">
					<section className="flex-1">
						<div className="flex flex-col">
							<Logo className="text-white" isWhite />
							<Link href="https://opale-concept.com/" target="_blank">
								<span className="text-sm mt-2">Opale-concept © {currentYear}</span>
							</Link>
						</div>
					</section>
					<div className="flex flex-row gap-8 flex-1 justify-start xs:justify-end">
						{/*<ListSection title="Navigation">
							{mainNavigation.map((item) => (
								<li key={item.route}>
									<Link href={item.route}>{item.label}</Link>
								</li>
							))}
						</ListSection>*/}
						<ListSection title="Social">
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
				</div>
			</div>
		</div>
	)
}

export default memo(Footer)
