//import { AiOutlineLoading3Quarters as LoadingIcon } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters'
import type { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { forwardRef, ReactNode } from 'react'
import { buttonVariants, iconVariants } from '@/app/variants'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {
	isLoading?: boolean
	loadingText?: string
	fullWidth?: boolean
	icon?: ReactNode
	variant?: VariantProps<typeof buttonVariants>['variant']
	size?: VariantProps<typeof buttonVariants>['size']
}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { isLoading = false, children, loadingText, disabled, fullWidth = false, className = '', variant = 'default', size = 'md', icon, ...rest } = props

	const disabledClass = 'opacity-50 cursor-not-allowed pointer-events-none'

	return (
		<button
			ref={ref}
			className={clsx(
				buttonVariants({
					variant,
					size,
				}),
				{
					[disabledClass]: disabled,
				},
				{
					'w-full box-border': fullWidth,
				},
				className
			)}
			disabled={disabled || isLoading}
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
		</button>
	)
})

CustomButton.displayName = 'CustomButton'
export default CustomButton
