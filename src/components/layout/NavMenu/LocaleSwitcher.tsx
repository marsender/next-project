'use client'

import { CaretDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import React, { Fragment, useTransition } from 'react'

import { Locale, routing, usePathname, useRouter } from '@/i18n/routing'

import Item from './Item'

export const LocaleSwitcher = () => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const t = useTranslations('LocaleSwitcher')
	const locale = useLocale()

	const locales = routing.locales

	function onChange(value: string) {
		const nextLocale = value as Locale

		startTransition(() => {
			router.replace(
				{
					pathname,
					query: Object.fromEntries(new URLSearchParams(searchParams)),
				},
				{ locale: nextLocale },
			)
			router.refresh()
		})
	}

	return (
		<div className="relative flex items-stretch">
			<div className="relative flex flex-row items-center gap-4">
				<NavigationMenu.Root className="content-s flex h-full items-stretch">
					<NavigationMenu.List className="flex h-full items-stretch">
						<NavigationMenu.Item asChild>
							<div className="flex items-stretch">
								<NavigationMenu.Trigger
									disabled={isPending}
									onPointerMove={(event) => event.preventDefault()}
									onPointerLeave={(event) => event.preventDefault()}
									className={`group leading-none select-none ${isPending ? 'cursor-not-allowed opacity-50' : ''}`}
								>
									<span className="flex items-center justify-between gap-0.5 rounded px-3 py-2 text-lg font-medium">
										{t(locale)}
										<CaretDownIcon
											className="text-violet10 relative top-px transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
											aria-hidden
										/>
									</span>
								</NavigationMenu.Trigger>
								<NavigationMenu.Content
									onPointerEnter={(event) => event.preventDefault()}
									onPointerLeave={(event) => event.preventDefault()}
									className="absolute top-0 left-0 w-full sm:w-auto"
								>
									<ul className="m-0 list-none sm:w-[600px]">
										{locales.map((value, index) => (
											<Fragment key={`${index}-nav-locale-menu-fragment`}>
												<Item key={value} onClick={() => onChange(value)} active={value === locale}>
													{t(value)}
												</Item>
											</Fragment>
										))}
									</ul>
								</NavigationMenu.Content>
							</div>
						</NavigationMenu.Item>
						<NavigationMenu.Indicator className="data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
							<div className="bg-background relative top-[70%] size-2.5 rotate-45 rounded-tl-sm" />
						</NavigationMenu.Indicator>
					</NavigationMenu.List>
					<div className="absolute top-full left-0 flex w-full justify-center perspective-[2000px]">
						<NavigationMenu.Viewport className="bg-background data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn relative h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
					</div>
				</NavigationMenu.Root>
			</div>
		</div>
	)
}
