'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Fragment } from 'react'

import { Link } from '@/i18n/routing'
import { mainNavigation,RouteHref } from '@/lib/constants'

const ListItem = ({ pathName, route, label }: { pathName: string | null; route: string; label: string }) => (
	<Link href={route as RouteHref} className={clsx('hover:text-gray-700 py-3 md:py-2 text-lg', pathName && pathName.split('/')[1] === route.split('/')[1] ? 'text-gray-900' : 'text-gray-400')}>
		{label}
	</Link>
)

const MenuItem = ({ pathName, route, label }: { pathName: string | null; route: string; label: string }) => (
	<li className={clsx('p-2', pathName && pathName.split('/')[1] === route.split('/')[1] ? 'text-gray-900' : 'text-gray-400')}>
		<NavigationMenu.Link asChild active={Boolean(pathName && pathName.split('/')[1] === route.split('/')[1])}>
			<Link href={route as RouteHref}>{label}</Link>
		</NavigationMenu.Link>
	</li>
)

/**
 * @see https://www.radix-ui.com/primitives/docs/components/navigation-menu
 */
export default function NavList() {
	const pathName = usePathname()
	const t = useTranslations('Navigation')
	const { status } = useSession()
	const navItems = mainNavigation.filter((item) => (item.displayWenUnauthenticated && status === 'unauthenticated') || (item.displayWenAuthenticated && status === 'authenticated'))

	//console.log('Session status: %o', status)

	return (
		<div className="relative">
			<div className="hidden sm:flex flex-row gap-2 sm:gap-4 items-center">
				{navItems.map((item, index) => (
					<Fragment key={`${index}-nav-list-fragment`}>
						<ListItem pathName={pathName} route={item.route} label={t(item.label)} />
						{index !== navItems.length - 1 && <span className="text-gray-400">|</span>}
					</Fragment>
				))}
			</div>
			<NavigationMenu.Root className="flex sm:hidden h-full content-start items-stretch">
				<NavigationMenu.List className="flex items-stretch h-full">
					<NavigationMenu.Item asChild>
						<div className="flex items-stretch">
							<NavigationMenu.Trigger onPointerMove={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()} className="group p-2 flex flex-row gap-2 items-center hover:text-violet-600 data-[state=open]:text-violet-600"></NavigationMenu.Trigger>
							<NavigationMenu.Content onPointerEnter={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()} className="absolute left-0 top-[44px] left-100 z-30 animate-in fade-in duration-300">
								<div className="w-auto sm:min-w-[224px] flex-auto overflow-hidden rounded-md bg-white 2xl:text-base leading-6 shadow-lg ring-1 ring-gray-900/5">
									<ul className="p-2 flex flex-col gap-2">
										{navItems.map((item, index) => (
											<Fragment key={`${index}-nav-list-menu-fragment`}>
												<MenuItem pathName={pathName} route={item.route} label={t(item.label)} />
												{index !== navItems.length - 1 && <span className="border-b border-gray-200"></span>}
											</Fragment>
										))}
									</ul>
								</div>
							</NavigationMenu.Content>
						</div>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</div>
	)
}
