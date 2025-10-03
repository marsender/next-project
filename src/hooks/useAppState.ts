'use client'

import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { getAppStateAction, setAppStateAction } from '@/actions/appState'
import { JSONValue } from '@/lib/directusState'

export const TANSTACK_USER_STATES_ID = 'user-states-id'

export function useAppState<T extends JSONValue>(key: string, defaultValue: T) {
	const queryClient = useQueryClient()
	const queryKey = [TANSTACK_USER_STATES_ID, key]

	const { data: state, isLoading } = useQuery<T>({
		queryKey: queryKey,
		queryFn: async () => {
			const value = await getAppStateAction(key)
			return (value as T) ?? defaultValue
		},
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})

	const { mutate } = useMutation({
		mutationFn: (newValue: T) => setAppStateAction(key, newValue),
		onMutate: async (newValue: T) => {
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
		},
		onError: (err, newValue, context) => {
			// If the mutation fails, use the context returned from onMutate to roll back
			queryClient.setQueryData(queryKey, context?.previousState)
		},
	})

	return [state ?? defaultValue, mutate, isLoading] as const
}
