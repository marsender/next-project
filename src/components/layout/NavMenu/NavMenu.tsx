'use client'

import { Session } from 'next-auth'
import { LogOut, User } from 'lucide-react'
import { routes } from '@/lib/constants'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
//import { HiChevronDown } from '@react-icons/all-files/hi/HiChevronDown'
import { signOut } from 'next-auth/react'
import Divider from './Divider'
import Item from './Item'
import Button from '@/components/Button'

type Props = { user?: Session['user'] }

export const NavMenu = ({ user }: Props) => {
	function onSignOut() {
		signOut({ callbackUrl: '/' })
	}

	return (
		<div className="relative flex items-stretch">
			<div className="flex flex-row gap-4 items-center relative">
				<NavigationMenu.Root className="h-full content-s flex items-stretch">
					<NavigationMenu.List className="flex items-stretch h-full">
						<NavigationMenu.Item asChild>
							<div className="flex items-stretch">
								<NavigationMenu.Trigger onPointerMove={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()}>
									<Button type="button" variant="ghost">
										User name todo
									</Button>
								</NavigationMenu.Trigger>
								<NavigationMenu.Content onPointerEnter={(event) => event.preventDefault()} onPointerLeave={(event) => event.preventDefault()} className="absolute right-0 :right-auto left-auto lg:left-[-100%] xl:left-[0] top-[130%] w-fit md:w-fit z-10 animate-in fade-in duration-300">
									<div className="w-auto min-w-[150px] sm:min-w-[224px] flex-auto overflow-hidden rounded-md bg-white text-sm 2xl:text-base leading-6 shadow-lg ring-1 ring-gray-900/5">
										<div className="py-2">
											<Item href={routes.ACCOUNT} icon={<User color="red" size={48} />}>
												My Account
											</Item>
											<Divider />
											<Item onClick={onSignOut} icon={<LogOut color="red" size={48} />}>
												Logout
											</Item>
										</div>
									</div>
								</NavigationMenu.Content>
							</div>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>
		</div>
	)
}
