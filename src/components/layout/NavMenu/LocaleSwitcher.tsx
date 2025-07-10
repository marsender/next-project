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
				{ locale: nextLocale }
			)
			router.refresh()
		})
	}

	return (
		<div className="relative flex items-stretch">
			<div className="flex flex-row gap-4 items-center relative">
				<NavigationMenu.Root className="h-full content-s flex items-stretch">
					<NavigationMenu.List className="flex items-stretch h-full">
						<NavigationMenu.Item asChild>
							<div className="flex items-stretch">
								<NavigationMenu.Trigger disabled={isPending} onPointerMove={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()} className={`group select-none leading-none ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>
									<span className="text-lg flex items-center justify-between gap-0.5 rounded px-3 py-2 font-medium">
										{t(locale)}
										<CaretDownIcon className="relative top-px text-violet10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180" aria-hidden />
									</span>
								</NavigationMenu.Trigger>
								<NavigationMenu.Content onPointerEnter={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()} className="absolute left-0 top-0 w-full sm:w-auto">
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
						<NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
							<div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
						</NavigationMenu.Indicator>
					</NavigationMenu.List>
					<div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
						<NavigationMenu.Viewport className="relative h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
					</div>
				</NavigationMenu.Root>
			</div>
		</div>
	)
}
