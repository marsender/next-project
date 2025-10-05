'use client'

import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { getAppStateAction, setAppStateAction } from '@/actions/appState'
import { JSONValue } from '@/lib/directusState'
import useCustomToast from './useCustomToast'

export const TANSTACK_USER_STATES_ID = 'user-states-id'

export function useAppState<T extends JSONValue>(key: string, defaultValue: T) {
	const queryClient = useQueryClient()
	const queryKey = [TANSTACK_USER_STATES_ID, key]
	const t = useTranslations('AppState')
	const { errorToast, successToast } = useCustomToast()

	const {
		data: state,
		isLoading,
		isError,
		error,
	} = useQuery<T>({
		queryKey: queryKey,
		queryFn: async () => {
			const value = await getAppStateAction(key)
			return (value as T) ?? defaultValue
		},
		retry: false, // Or a number of retry failed requests times
		refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
		gcTime: 1000 * 60 * 5, // 5 minutes
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})

	const { mutate } = useMutation({
		mutationFn: (newValue: T) => setAppStateAction(key, newValue),
		onMutate: async (newValue: T) => {
			// If the query has an error, we shouldn't attempt an optimistic update.
			// We can cancel the mutation and show a toast.
			if (isError) {
				errorToast(t('cannotUpdateInErrorState', { key }))
				return
			}

			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: queryKey })

			// Snapshot the previous value
			const previousState = queryClient.getQueryData(queryKey)

			// Optimistically update to the new value
			queryClient.setQueryData(queryKey, newValue)

			// Return a context object with the snapshotted value
			return { previousState }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKey })
			const keyInfo = { key: key.charAt(0).toUpperCase() + key.slice(1) }
			successToast(t('updateSuccess', keyInfo))
		},
		onError: (err, newValue, context) => {
			// If the mutation fails, use the context returned from onMutate to roll back
			queryClient.setQueryData(queryKey, context?.previousState)
			errorToast(t('failedToSave', { key }))
		},
	})

	// Effect to show a toast when the initial query fails
	useEffect(() => {
		if (isError && error) {
			errorToast(t('failedToLoad', { key }))
		}
	}, [isError, error, key, errorToast, t])

	return [state ?? defaultValue, mutate, isLoading] as const
}
