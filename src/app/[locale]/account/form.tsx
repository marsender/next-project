'use client'

import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input, Select } from '@/components/ui/input'
import { useAppState } from '@/hooks/useAppState'

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	theme: z.enum(['light', 'dark', 'system']),
})

type Theme = 'light' | 'dark' | 'system'

export default function AccountForm() {
	const { data: session } = useSession()
	const { setTheme: setNextTheme } = useTheme()
	const [theme, setTheme, isLoading] = useAppState<Theme>('theme', 'system')
	const themeOptions = ['light', 'dark', 'system'].map((option) => ({
		value: option,
		label: option.charAt(0).toUpperCase() + option.slice(1),
	}))

	// Define your form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: session?.user?.name ?? '',
			theme: 'system', // Initialize with a static value
		},
	})

	// Effect 1: Reset the form with the fetched value from the database
	useEffect(() => {
		if (!isLoading && theme && session?.user?.name) {
			// When data is loaded, reset the form to show the correct values.
			form.reset({ theme: theme, username: session.user.name })
		}
	}, [isLoading, theme, form, session])

	// Effect 2: Sync the form's theme with the next-themes context for instant UI feedback
	useEffect(() => {
		const subscription = form.watch((value) => {
			setNextTheme(value.theme as Theme)
		})
		return () => subscription.unsubscribe()
	}, [form, setNextTheme])

	// Define the submit handler to persist the state
	function onSubmit(values: z.infer<typeof formSchema>) {
		const { theme: formTheme } = values
		setNextTheme(formTheme)
		setTheme(formTheme) // Persist the theme to the database on submit
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									readOnly
									type="text"
									placeholder="Username"
									className="w-full rounded-lg border px-4 py-2 shadow-sm transition-shadow focus:ring-2 focus:outline-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>This is your public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="theme"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Theme</FormLabel>
							<FormControl>
								<Select options={themeOptions} {...field} />
							</FormControl>
							<FormDescription>Select the theme for the dashboard.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
