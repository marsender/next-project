import { routes } from '@/lib/constants'
import { Session } from 'next-auth'
import Link from 'next/link'
import Logo from './Logo'
import NavList from './NavList'
import Button from '@/components/Button'
import { NavMenu } from './NavMenu/NavMenu'

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
				<div className=" flex flex-row items-center">
					{user && <NavMenu user={user} />}
					{!user && (
						<Link href={routes.LOGIN}>
							<Button type="button" variant="ghost">
								Login
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
