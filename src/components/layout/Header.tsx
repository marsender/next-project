import { routes } from '@/lib/constants'
import { Session } from 'next-auth'
import { Link } from '@/i18n/routing'
import Logo from './Logo'
import NavList from './NavList'
import { NavMenu } from './NavMenu/NavMenu'
import { LocaleSwitcher } from './NavMenu/LocaleSwitcher'

type Props = { user?: Session['user'] }

export default function Header({ user }: Props) {
	return (
		<div className="flex items-center bg-white relative z-50">
			<div className="max-w-screen-xl w-full p-2 mx-auto flex justify-between items-center">
				<div className="flex flex-row gap-8 items-center">
					<Link href={routes.HOME} className="hidden sm:flex">
						<Logo isWhite={false} />
					</Link>
					<NavList />
				</div>
				<div className=" flex flex-row items-center">
					<LocaleSwitcher />
					<NavMenu user={user} />
				</div>
			</div>
		</div>
	)
}
