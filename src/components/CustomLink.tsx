import { ReactNode, forwardRef } from 'react'
//import { AiOutlineLoading3Quarters as LoadingIcon } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters'
import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import NextLink from 'next/link'
import { buttonVariants, iconVariants } from '@/app/variants'

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'>, VariantProps<typeof buttonVariants> {
	fullWidth?: boolean
	icon?: ReactNode
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	const { children, fullWidth = false, href = '/', className = '', variant = 'default', size = 'md', icon, ...rest } = props

	return (
		<NextLink
			ref={ref}
			href={href}
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
		</NextLink>
	)
})

CustomLink.displayName = 'CustomLink'
export default CustomLink
