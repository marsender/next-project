import { ReactNode, forwardRef } from 'react'
//import { AiOutlineLoading3Quarters as LoadingIcon } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters'
import { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { Link } from '@/i18n/routing'
import { buttonVariants, iconVariants } from '@/app/variants'
import { RouteHref } from '@/lib/constants'

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'>, VariantProps<typeof buttonVariants> {
	fullWidth?: boolean
	icon?: ReactNode
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	const { children, fullWidth = false, href = '/', className = '', variant = 'default', size = 'md', icon, ...rest } = props

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
