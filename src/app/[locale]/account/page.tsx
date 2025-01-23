import { getTranslations } from 'next-intl/server'

import PageLayout from '@/components/pages/PageLayout'

type Props = {
	params: Promise<{ locale: string }>
}

export default async function AccountPage({ params }: Props) {
	const { locale } = await params

	const t = await getTranslations({ locale, namespace: 'AccountPage' })

	return (
		<PageLayout title={t('title')} subtitle={t('subtitle')}>
			<div className="max-w-[490px]">
				{t.rich('description', {
					p: (chunks) => <p className="mt-4">{chunks}</p>,
					strong: (chunks) => <code className="font-mono text-gray-400">{chunks}</code>,
				})}
			</div>
		</PageLayout>
	)
}
