import { Session } from 'next-auth'

import { Link } from '@/i18n/routing'
import { routes } from '@/lib/constants'

import Logo from './Logo'
import NavList from './NavList'
import { LocaleSwitcher } from './NavMenu/LocaleSwitcher'
import { NavMenu } from './NavMenu/NavMenu'

type Props = { user?: Session['user'] }

export default function Header({ user }: Props) {
	return (
		<div className="relative z-50 flex items-center bg-white">
			<div className="mx-auto flex w-full max-w-screen-xl items-center justify-between p-2">
				<div className="flex flex-row items-center gap-8">
					<Link href={routes.HOME} className="hidden sm:flex">
						<Logo isWhite={false} />
					</Link>
					<NavList />
				</div>
				<div className="flex flex-row items-center">
					<LocaleSwitcher />
					{false ? <NavMenu user={user} /> : null}
				</div>
			</div>
		</div>
	)
}
