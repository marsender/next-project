import { useMutation, useQuery, useQueryClient, UseMutationResult } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { stateService } from '@/lib/directusState'

type SetStateMutation<T> = UseMutationResult<void, Error, T, unknown>['mutate']

export function useAppState<T>(key: string, defaultValue: T | null = null): [T | null, SetStateMutation<T>] {
	const { data: session } = useSession()
	const queryClient = useQueryClient()
	const userId = session?.user?.id

	const queryKey = ['user-state', userId, key]

	const { data: state } = useQuery({
		queryKey: queryKey,
		// The query will only run if userId is available, so we can safely assert it's a string.
		queryFn: () => stateService.getUserState<T>(userId!, key),
		enabled: !!userId,
		initialData: defaultValue,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})

	const { mutate: setState } = useMutation<void, Error, T>({
		mutationFn: (value: T) => {
			if (!userId) {
				// This should ideally not happen if the UI prevents it, but it's a good safeguard.
				return Promise.reject(new Error('User is not authenticated.'))
			}
			return stateService.setUserState<T>(userId, key, value)
		},
		onSuccess: () => {
			// Invalidate the query to refetch the new state from the server.
			queryClient.invalidateQueries({ queryKey })
		},
	})

	return [state as T | null, setState]
}
