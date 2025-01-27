//import { AiOutlineLoading3Quarters as LoadingIcon } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters'
import VariantProps from 'class-variance-authority'
import clsx from 'clsx'
import { forwardRef, ReactNode } from 'react'

import { buttonVariants, iconVariants } from '@/app/variants'

export interface DivProps extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof buttonVariants> {
	isLoading?: boolean
	loadingText?: string
	fullWidth?: boolean
	icon?: ReactNode
	variant?: any
	size?: any
}

const CustomDiv = forwardRef<HTMLDivElement, DivProps>((props, ref) => {
	const { isLoading = false, children, loadingText, fullWidth = false, className = '', variant = 'default', size = 'md', icon, ...rest } = props

	return (
		<div
			ref={ref}
			className={clsx(
				buttonVariants({
					variant,
					size,
				}),
				{
					'w-full box-border': fullWidth,
				},
				className
			)}
			{...rest}
		>
			{isLoading ? (
				<div className="flex items-center gap-4">
					{!!loadingText && loadingText}
					<span role="status">
						Loading
						{/*<LoadingIcon className={clsx('animate-spin', iconVariants({ size }))} aria-hidden="true" />*/}
					</span>
				</div>
			) : (
				<span className="flex items-center justify-center gap-2">
					{children && (
						<span
							className={clsx({
								'opacity-0 pointer-events-none': isLoading,
							})}
						>
							{children}
						</span>
					)}
					{icon && !isLoading && <span className={clsx('flex items-center justify-center', iconVariants({ size }))}>{icon}</span>}
				</span>
			)}
		</div>
	)
})

CustomDiv.displayName = 'CustomDiv'
export default CustomDiv
