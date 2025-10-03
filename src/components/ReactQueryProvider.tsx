'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	// We use useState to ensure the QueryClient is only created once per component lifecycle.
	const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } }))

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
