import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { JSX } from 'react/jsx-runtime'

import { Link } from '@/i18n/routing'
import { RouteHref } from '@/lib/constants'

interface MenuItemProps {
	icon?: React.ReactNode
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
	children: React.ReactNode
	href: string
}

const Item: Overload = (props: AnchorProps | ButtonProps) => {
	const { icon, children, href, ...otherProps } = props as Props

	return (
		<NavigationMenu.Item className="group relative gap-x-6 hover:bg-violet-50 list-none text-black">
			{hasHref(props) ? (
				<div className="flex items-center py-[6px] px-3">
					{icon && (
						<span className="flex items-center justify-center h-4 w-4 mr-3" aria-hidden>
							{icon}
						</span>
					)}
					<NavigationMenu.Link asChild>
						<Link href={href as RouteHref} className="whitespace-nowrap 2xl:text-base" {...otherProps}>
							{children}
						</Link>
					</NavigationMenu.Link>
				</div>
			) : (
				<div className="flex items-center py-[6px] px-3" {...otherProps}>
					{icon && (
						<span className="flex items-center justify-center h-4 w-4 mr-3" aria-hidden>
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
