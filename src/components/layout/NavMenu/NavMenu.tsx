'use client'

import { Session } from 'next-auth'
import { LogOut, User } from 'lucide-react'
import { routes } from '@/lib/constants'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'
import Divider from './Divider'
import Item from './Item'
import { Link } from '@/i18n/routing'

type Props = { user?: Session['user'] }

export const NavMenu = ({ user }: Props) => {
	function onSignOut() {
		signOut({ callbackUrl: '/' })
	}

	return (
		<>
			{!user && (
				<Link href={routes.LOGIN}>
					<div className="text-lg flex items-center justify-between gap-0.5 rounded px-3 py-2 font-medium text-gray-900">Login</div>
				</Link>
			)}
			{user && (
				<div className="relative flex items-stretch">
					<div className="flex flex-row gap-4 items-center relative">
						<NavigationMenu.Root className="h-full content-s flex items-stretch">
							<NavigationMenu.List className="flex items-stretch h-full">
								<NavigationMenu.Item asChild>
									<div className="flex items-stretch">
										<NavigationMenu.Trigger onPointerMove={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()} className="group  select-none leading-none">
											<span className="text-lg flex items-center justify-between gap-0.5 rounded px-3 py-2 font-medium text-gray-900">
												User name todo
												<CaretDownIcon className="relative top-px text-violet10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" aria-hidden />
											</span>
										</NavigationMenu.Trigger>
										<NavigationMenu.Content onPointerEnter={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()} className="absolute left-0 top-0 w-full sm:w-auto">
											<ul className="m-0 list-none sm:w-[600px]">
												<Item href={routes.ACCOUNT} icon={<User color="red" size={48} />}>
													My Account
												</Item>
												<Divider />
												<Item onClick={onSignOut} icon={<LogOut color="red" size={48} />}>
													Logout
												</Item>
											</ul>
										</NavigationMenu.Content>
									</div>
								</NavigationMenu.Item>
								<NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
									<div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
								</NavigationMenu.Indicator>
							</NavigationMenu.List>
							<div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
								<NavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
							</div>
						</NavigationMenu.Root>
					</div>
				</div>
			)}
		</>
	)
}
