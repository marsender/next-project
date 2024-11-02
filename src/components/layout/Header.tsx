import { routes } from '@/lib/constants'
import { Session } from 'next-auth'
import Link from 'next/link'
import Logo from './Logo'
import NavList from './NavList'

type Props = { user?: Session['user'] }

export default function Header({ user }: Props) {
	return (
		<div className="flex items-center bg-white relative z-50">
			<div className="max-w-screen-xl w-full p-2 mx-auto flex justify-between items-center">
				<div className="flex flex-row gap-8 items-center">
					<Link className="hidden sm:flex" href={routes.HOME}>
						<Logo isWhite={false} />
					</Link>
					<NavList />
				</div>
			</div>
		</div>
	)
}
