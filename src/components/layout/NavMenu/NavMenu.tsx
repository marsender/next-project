'use client'

import { CaretDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { LogOut, User } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/routing'
import { getNavigationLabel, routes } from '@/lib/constants'

import Divider from './Divider'
import Item from './Item'

type Props = { user?: Session['user'] }

const onSignOut = (callbackUrl: string) => {
	signOut({ callbackUrl })
}

export const NavMenu = ({ user }: Props) => {
	const t = useTranslations('Navigation')

	return (
		<>
			{!user && (
				<Link href={routes.LOGIN}>
					<div className="text-foreground flex items-center justify-between gap-0.5 rounded px-3 py-2 text-lg font-medium">
						Login
					</div>
				</Link>
			)}
			{user && (
				<div className="relative flex items-stretch">
					<div className="relative flex flex-row items-center gap-4">
						<NavigationMenu.Root className="content-s flex h-full items-stretch">
							<NavigationMenu.List className="flex h-full items-stretch">
								<NavigationMenu.Item asChild>
									<div className="flex items-stretch">
										<NavigationMenu.Trigger
											onPointerMove={(event) => event.preventDefault()}
											onPointerLeave={(event) => event.preventDefault()}
											className="group leading-none select-none"
										>
											<span className="text-foreground flex items-center justify-between gap-0.5 rounded px-3 py-2 text-lg font-medium">
												User name todo
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
												<Item href={routes.ACCOUNT} icon={<User color="red" size={48} />}>
													{t(getNavigationLabel(routes.ACCOUNT))}
												</Item>
												<Divider />
												<Item onClick={() => onSignOut(routes.HOME)} icon={<LogOut color="red" size={48} />}>
													{t(getNavigationLabel(routes.LOGOUT))}
												</Item>
											</ul>
										</NavigationMenu.Content>
									</div>
								</NavigationMenu.Item>
								<NavigationMenu.Indicator className="data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
									<div className="bg-background relative top-[70%] size-2.5 rotate-45 rounded-tl-sm" />
								</NavigationMenu.Indicator>
							</NavigationMenu.List>
							<div className="absolute top-full left-0 flex w-full justify-center perspective-[2000px]">
								<NavigationMenu.Viewport className="bg-background data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
							</div>
						</NavigationMenu.Root>
					</div>
				</div>
			)}
		</>
	)
}
