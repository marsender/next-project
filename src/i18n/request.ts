import { getRequestConfig } from 'next-intl/server'

import { type Locale, routing } from '@/i18n/routing'

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the `[locale]` segment
	let locale = await requestLocale

	// Ensure that a valid locale is used
	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale
	}

	// When using Turbopack, this will enable HMR for `en`
	const messagesModule = await (locale === 'en' ? import('../../messages/en.json', { with: { type: 'json' } }) : import(`../../messages/${locale}.json`, { with: { type: 'json' } }))

	return {
		locale,
		messages: messagesModule.default,
	}
})
