import { cva } from 'class-variance-authority'

export const buttonVariants = cva('rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex items-center justify-center gap-2 cursor-pointer', {
	variants: {
		variant: {
			default: 'shadow-sm bg-violet-600 hover:bg-violet-700 text-white',
			outline: 'border border-1 shadow-sm bg-transparent hover:bg-violet-700 text-violet-700 border-violet-600 hover:text-white box-border',
			destructive: 'border-1 shadow-sm bg-red-700 hover:bg-red-600 text-white border-red-700',
			destructiveOutline: 'border-1 shadow-sm bg-transparent text-red-700 border-1 border-red-700 hover:bg-red-100 hover:text-white',
			success: 'border-1 shadow-sm bg-[#4ade80] hover:bg-[#3dba6b] text-white border-[#4ade80] hover:border-[#3dba6b]',
			ghost: 'bg-transparent text-violet-700 border-1 border-transparent hover:bg-violet-100 hover:border-violet-100',
			destructiveGhost: 'bg-transparent text-red-700 border-1 border-transparent hover:bg-red-100 hover:border-red-100',
			link: 'border-0 text-gray-700 text-sm underline hover:text-gray-400 !px-0 !font-normal',
		},
		size: {
			sm: 'py-1 px-4 text-sm',
			md: 'py-2 px-5 text-base',
			lg: 'px-6 py-3 text-lg',
		},
	},
})

export const iconVariants = cva('', {
	variants: {
		size: {
			sm: 'h-4 w-4',
			md: 'h-5 w-5',
			lg: 'h-6 w-6',
		},
	},
})
