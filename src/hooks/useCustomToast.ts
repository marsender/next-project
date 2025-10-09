'use client'

import { useTranslations } from 'next-intl'
import { toast } from './use-toast'

const useCustomToast = () => {
	const t = useTranslations('Toast')
	return {
		errorToast: (message: string) => {
			toast({
				title: t('error'),
				description: message,
				variant: 'destructive',
			})
		},
		successToast: (message: string) => {
			toast({
				title: t('success'),
				description: message,
			})
		},
		infoToast: (message: string) => {
			toast({
				description: message,
			})
		},
	}
}

export default useCustomToast
