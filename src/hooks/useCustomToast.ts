import { toast } from "./use-toast"

const useCustomToast = () => {
	return {
		errorToast: (message: string) => {
			toast({
				title: 'Error',
				description: message,
				variant: "destructive",
			})
		},
		successToast: (message:string) => {
			toast({
				title: 'Success',
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