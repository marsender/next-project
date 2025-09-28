import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import { JSX } from 'react/jsx-runtime'

import { Link } from '@/i18n/routing'
import { RouteHref } from '@/lib/constants'

interface MenuItemProps {
	icon?: React.ReactNode
	active?: boolean
}

// Button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, MenuItemProps {
	href?: undefined
}

// Anchor props
interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, MenuItemProps {
	href?: string
}

// Input/output options
type Overload = {
	(props: ButtonProps): JSX.Element
	(props: AnchorProps): JSX.Element
}

const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps => 'href' in props

interface Props {
	icon?: React.ReactNode
	active?: boolean
	children: React.ReactNode
	href: string
}

const Item: Overload = (props: AnchorProps | ButtonProps) => {
	const { icon, active, children, href, ...otherProps } = props as Props

	return (
		<NavigationMenu.Item
			className={clsx(
				'group list-non relative gap-x-6',
				active ? 'cursor-default text-gray-400' : 'text-foreground cursor-pointer hover:text-gray-700',
			)}
		>
			{hasHref(props) ? (
				<div className="flex items-center px-3 py-[6px]">
					{icon && (
						<span className="mr-3 flex h-4 w-4 items-center justify-center" aria-hidden>
							{icon}
						</span>
					)}
					<NavigationMenu.Link asChild active={active}>
						<Link href={href as RouteHref} className="whitespace-nowrap 2xl:text-base" {...otherProps}>
							{children}
						</Link>
					</NavigationMenu.Link>
				</div>
			) : (
				<div className="flex items-center px-3 py-[6px]" {...otherProps}>
					{icon && (
						<span className="mr-3 flex h-4 w-4 items-center justify-center" aria-hidden>
							{icon}
						</span>
					)}
					<span className="whitespace-nowrap 2xl:text-base">{children}</span>
				</div>
			)}
		</NavigationMenu.Item>
	)
}

export default Item
