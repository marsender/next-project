import { toast, ToastOptions } from 'react-hot-toast'

/**
 * @see https://react-hot-toast.com/docs/toast
 */
export const customToastOptions: ToastOptions = {
	duration: 6000,
	position: 'top-center',
}

const useCustomToast = () => {
	return {
		errorToast: (message: string) => {
			toast.error(message)
		},
		successToast: (message: string) => {
			toast.success(message)
		},
		infoToast: (message: string) => {
			toast(message)
		},
	}
}

export default useCustomToast
