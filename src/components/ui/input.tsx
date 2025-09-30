import { cn } from '@/lib/utils'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

import { type VariantProps, cva } from 'class-variance-authority'
import { unstable_PasswordToggleField as PasswordToggleField } from 'radix-ui'
import React from 'react'

// Assuming you have a cn utility function

const inputVariants = cva(
	'w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-solid',
	{
		variants: {
			variant: {
				default:
					'bg-canvas-bg border border-canvas-border text-canvas-text hover:border-canvas-border-hover focus:border-primary-border',
				error: 'bg-canvas-bg border border-alert-border text-alert-text',
			},
			size: {
				default: 'px-4 py-3',
				sm: 'px-3 py-2 text-sm',
				lg: 'px-5 py-4',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

const labelVariants = cva('block text-sm font-medium mb-2', {
	variants: {
		variant: {
			default: 'text-canvas-text',
			error: 'text-alert-text',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	label?: string
	error?: string
	required?: boolean
	containerClassName?: string
}

interface TextareaProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	label?: string
	error?: string
	required?: boolean
	containerClassName?: string
}

interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	label?: string
	error?: string
	required?: boolean
	containerClassName?: string
	options: { value: string; label: string }[]
	placeholder?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, size, label, error, required, containerClassName, ...props }, ref) => {
		const hasError = !!error
		const inputVariant = hasError ? 'error' : variant
		const labelVariant = hasError ? 'error' : 'default'

		return (
			<div className={cn(containerClassName)}>
				{label && (
					<label htmlFor={props.id} className={cn(labelVariants({ variant: labelVariant }))}>
						{label}
						{required && ' *'}
					</label>
				)}
				{props.type === 'password' ? (
					<div className="relative">
						<PasswordToggleField.Root>
							<PasswordToggleField.Input
								className={cn(inputVariants({ variant: inputVariant, size, className }), 'pr-10')}
								ref={ref}
								{...props}
								autoComplete="current-password"
								autoCapitalize="none"
								spellCheck="false"
							/>
							<PasswordToggleField.Toggle className="text-canvas-text hover:text-canvas-text-subtle absolute inset-y-0 right-0 flex items-center pr-3">
								<PasswordToggleField.Icon
									visible={<EyeOpenIcon className="h-5 w-5" />}
									hidden={<EyeClosedIcon className="h-5 w-5" />}
								/>
							</PasswordToggleField.Toggle>
						</PasswordToggleField.Root>
					</div>
				) : (
					<input className={cn(inputVariants({ variant: inputVariant, size, className }))} ref={ref} {...props} />
				)}
				{error && <p className="text-alert-text mt-1 text-sm">{error}</p>}
			</div>
		)
	},
)

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, variant, size, label, error, required, containerClassName, ...props }, ref) => {
		const hasError = !!error
		const inputVariant = hasError ? 'error' : variant
		const labelVariant = hasError ? 'error' : 'default'

		return (
			<div className={cn(containerClassName)}>
				{label && (
					<label htmlFor={props.id} className={cn(labelVariants({ variant: labelVariant }))}>
						{label}
						{required && ' *'}
					</label>
				)}
				<textarea
					className={cn(inputVariants({ variant: inputVariant, size, className }), 'resize-vertical')}
					ref={ref}
					{...props}
				/>
				{error && <p className="text-alert-text mt-1 text-sm">{error}</p>}
			</div>
		)
	},
)

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, variant, size, label, error, required, containerClassName, options, placeholder, ...props }, ref) => {
		const hasError = !!error
		const inputVariant = hasError ? 'error' : variant
		const labelVariant = hasError ? 'error' : 'default'

		return (
			<div className={cn(containerClassName)}>
				{label && (
					<label htmlFor={props.id} className={cn(labelVariants({ variant: labelVariant }))}>
						{label}
						{required && ' *'}
					</label>
				)}
				<select className={cn(inputVariants({ variant: inputVariant, size, className }))} ref={ref} {...props}>
					{placeholder && <option value="">{placeholder}</option>}
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{error && <p className="text-alert-text mt-1 text-sm">{error}</p>}
			</div>
		)
	},
)

Input.displayName = 'Input'
Textarea.displayName = 'Textarea'
Select.displayName = 'Select'

export { Input } // Textarea, Select, inputVariants
