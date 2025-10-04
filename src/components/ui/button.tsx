import { memo } from 'react'
import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'

import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/app/variants'

// Spinner component with smooth appearance animation
const Spinner = () => (
	<svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
		<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		></path>
	</svg>
)

interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	leadingIcon?: React.ReactElement
	trailingIcon?: React.ReactElement
	iconOnly?: boolean // set for icon buttons
	isLoading?: boolean // new loading state prop
	loadingText?: string // optional loading text
	fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			color,
			variant,
			size,
			asChild = false,
			leadingIcon,
			trailingIcon,
			iconOnly = false,
			isLoading = false,
			loadingText,
			className,
			children,
			disabled,
			fullWidth = false,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button'

		// If iconOnly is true, we only render the leadingIcon
		const icon = iconOnly ? leadingIcon : null

		// Determine if button should be disabled (when loading or explicitly disabled)
		const isDisabled = isLoading || disabled

		return (
			<Comp
				ref={ref}
				type="button"
				className={buttonVariants({
					color,
					variant,
					size,
					isIcon: iconOnly,
					isLoading,
					fullWidth,
					className,
				})}
				disabled={isDisabled}
				{...props}
			>
				{(() => {
					if (isLoading && iconOnly) {
						return <Spinner />
					}
					if (!isLoading && iconOnly) {
						return icon
					}

					// When asChild is true, we must return a single element, not a fragment.
					// A span is a good choice as it's a non-blocking inline element.
					const Wrapper = asChild ? 'span' : React.Fragment

					return (
						<Wrapper>
							{isLoading && !iconOnly && <Spinner />}
							{!isLoading && !iconOnly && leadingIcon && <span className="mr-2">{leadingIcon}</span>}
							{isLoading && !iconOnly ? loadingText || children : children}
							{!isLoading && !iconOnly && trailingIcon && <span className="ml-2">{trailingIcon}</span>}
						</Wrapper>
					)
				})()}
			</Comp>
		)
	},
)
Button.displayName = 'Button'

// export default Button;

const ButtonMemoized = memo(Button)
export { ButtonMemoized as Button }
