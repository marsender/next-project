import type { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { forwardRef, ReactNode } from 'react'

import { buttonVariants, iconVariants } from '@/app/variants'
import { Link } from '@/i18n/routing'
import { RouteHref } from '@/lib/constants'

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'>, VariantProps<typeof buttonVariants> {
	fullWidth?: boolean
	icon?: ReactNode
	blankTarget?: boolean
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	const { children, fullWidth = false, href = '/', className = '', variant = 'default', size = 'md', icon, blankTarget = false, ...rest } = props

	return (
		<Link
			ref={ref}
			href={href as RouteHref}
			className={clsx(
				buttonVariants({
					variant,
					size,
				}),
				{
					'w-full': fullWidth,
				},
				className
			)}
			target={blankTarget ? '_blank' : undefined}
			{...rest}
		>
			<span className="flex items-center justify-center gap-2">
				{icon && <span className={clsx('flex items-center justify-center', iconVariants({ size }))}>{icon}</span>}
				{children && children}
			</span>
		</Link>
	)
})

CustomLink.displayName = 'CustomLink'
export default CustomLink
