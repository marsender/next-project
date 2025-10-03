import { useMutation, useQuery, useQueryClient, UseMutationResult } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { JSONValue, stateService } from '@/lib/directusState'

export const TANSTACK_USER_STATES_ID = 'user-states-id'

type SetStateMutation<T> = UseMutationResult<void, Error, T, unknown>['mutate']

export function useAppState<T extends JSONValue>(
	key: string,
	defaultValue: T | null = null,
): [T | null, SetStateMutation<T>] {
	const { data: session } = useSession()
	const queryClient = useQueryClient()
	const userId = session?.user?.id

	// Init tanstack unique identifier for the user state
	const queryKey = [TANSTACK_USER_STATES_ID, userId, key]

	const { data: state } = useQuery({
		queryKey: queryKey,
		// The query will only run if userId is available, so we can safely assert it's a string.
		queryFn: () => stateService.getUserState<T>(userId!, key),
		enabled: !!userId,
		initialData: defaultValue, // Use the default value as initial data
		staleTime: 100, // 0 will refetch immediately in the background after the initial data is used. For 5 minues: 1000 * 60 * 5
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

	// If the query returns null (e.g., no state found in the DB), fall back to the defaultValue.
	// This ensures the hook is consistent and doesn't return null when a default is provided.
	return [state ?? defaultValue, setState]
}
