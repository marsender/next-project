import { getTranslations } from 'next-intl/server'

import PageLayout from '@/components/pages/PageLayout'
import LoginForm from './form'

export const dynamic = 'force-dynamic'

type Props = {
	params: Promise<{ locale: string }>
}

export default async function LoginPage({ params }: Props) {
	const { locale } = await params

	const t = await getTranslations({ locale, namespace: 'LoginPage' })
	return (
		<PageLayout title={t('title')}>
			<div className="max-w-[490px]">
				<LoginForm />
			</div>
		</PageLayout>
	)
}
