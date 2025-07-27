'use client'

import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

import { routes } from '@/lib/constants'

export default function Logout() {
	useEffect(() => {
		signOut({ callbackUrl: routes.HOME })
	}, [])

	return null
}
