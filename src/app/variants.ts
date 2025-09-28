//import React from 'react'
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
	'items-center justify-center rounded-lg font-medium transition-all duration-300 ease-out disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none hover:shadow-[0_1px_3px_0_rgb(0,0,0,0.1),0_1px_2px_-1px_rgb(0,0,0,0.1)]',

	{
		variants: {
			color: {
				primary: '',
				neutral: '',
				secondary: '',
				outline: '',
				ghost: '',
				link: '',
			},
			variant: {
				solid: '',
				soft: '',
				surface: '',
				outline: '',
				ghost: '',
				destructive: 'bg-alert-solid text-alert-on-alert hover:bg-alert-solid-hover ',
			},
			size: {
				sm: 'px-5 h-8 text-sm',
				default: 'px-6 h-10 text-base',
				lg: 'px-8 h-14 text-lg',
			},
			// Add a new isIcon variant
			isIcon: {
				true: '',
				false: '',
			},
			// Add a loading variant
			isLoading: {
				true: '',
				false: '',
			},
			fullWidth: {
				false: 'inline-flex w-fit', // default: shrink-to-fit
				true: 'flex w-full', // fill the container
			},
		},
		compoundVariants: [
			// Primary color variants
			{
				color: 'primary',
				variant: 'solid',
				class: 'bg-primary-solid text-primary-on-primary hover:bg-primary-solid-hover active:bg-primary-solid-hover/90',
			},
			{
				color: 'primary',
				variant: 'soft',
				class: 'bg-primary-bg-hover text-primary-text-contrast hover:bg-primary-bg-active active:bg-primary-line',
			},
			{
				color: 'primary',
				variant: 'surface',
				class:
					'border border-primary-border bg-primary-bg-subtle text-primary-text-contrast hover:bg-primary-bg hover:border-primary-border-hover active:bg-primary-bg-hover',
			},
			{
				color: 'primary',
				variant: 'outline',
				class: 'border border-primary-border text-primary-text-contrast hover:border-primary-border-hover',
			},
			{
				color: 'primary',
				variant: 'ghost',
				class: 'bg-transparent text-primary-text hover:bg-primary-bg-hover active:bg-primary-bg-active',
			},
			{
				color: 'primary',
				variant: 'destructive',
				class: 'bg-alert-solid text-alert-on-alert hover:bg-alert-solid-hover',
			},
			// Neutral color variants
			{
				color: 'neutral',
				variant: 'solid',
				class:
					'bg-canvas-text-contrast text-canvas-on-canvas hover:bg-canvas-text-contrast/90 active:bg-canvas-text-contrast/80 ',
			},
			{
				color: 'neutral',
				variant: 'soft',
				class: 'bg-canvas-bg-hover text-canvas-text hover:bg-canvas-bg-active active:bg-canvas-line',
			},
			{
				color: 'neutral',
				variant: 'surface',
				class:
					'border border-canvas-border bg-canvas-bg text-canvas-text hover:bg-canvas-bg-hover hover:border-canvas-border-hover active:bg-canvas-bg-active',
			},
			{
				color: 'neutral',
				variant: 'outline',
				class: 'border border-canvas-border text-canvas-text hover:border-canvas-border-hover',
			},
			{
				color: 'neutral',
				variant: 'ghost',
				class: 'bg-transparent text-canvas-text hover:bg-canvas-bg-hover active:bg-canvas-bg-active',
			},
			{
				color: 'neutral',
				variant: 'destructive',
				class: 'bg-alert-solid text-alert-on-alert hover:bg-alert-solid-hover',
			},
			// Focus ring styles based on color
			{
				color: 'primary',
				class: 'focus-visible:ring-primary-solid',
			},
			{
				color: 'neutral',
				class: 'focus-visible:ring-canvas-solid',
			},

			// Icon button styles
			{
				isIcon: true,
				size: 'sm',
				class: '!px-0 !w-8 !max-w-8 hover:!shadow-none',
			},
			{
				isIcon: true,
				size: 'default',
				class: '!px-0 !w-10 !max-w-10 hover:!shadow-none',
			},
			{
				isIcon: true,
				size: 'lg',
				class: '!px-0 !w-14 !max-w-14 hover:!shadow-none',
			},
			// Loading state styles
			{
				isLoading: true,
				class: 'relative !cursor-wait',
			},
		],
		defaultVariants: {
			color: 'primary',
			variant: 'solid',
			size: 'default',
			isIcon: false,
			isLoading: false,
			fullWidth: false,
		},
	},
)

export const iconVariants = cva('', {
	variants: {
		size: {
			sm: 'h-4 w-4',
			default: 'h-5 w-5',
			lg: 'h-6 w-6',
		},
	},
})
