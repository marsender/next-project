import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import Footer from '@/components/layout/Footer'

describe('Footer', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: (query: string) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: () => {},
				removeListener: () => {},
				addEventListener: () => {},
				removeEventListener: () => {},
				dispatchEvent: () => false,
			}),
		})
	})

	test('renders the footer', () => {
		// Mock translations
		const messages = {
			Footer: {
				networks: 'Networks',
			},
		}

		render(
			<NextIntlClientProvider locale="en" messages={messages}>
				<Footer />
			</NextIntlClientProvider>,
		)

		expect(screen.getByText('GitHub')).toBeInTheDocument()
	})
})
