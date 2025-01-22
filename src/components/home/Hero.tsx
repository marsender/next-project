import { User } from 'lucide-react'
import Image from 'next/image'
//import { useTranslations, useLocale } from 'next-intl'
import { getLocale,getTranslations } from 'next-intl/server'

import CustomLink from '@/components/CustomLink'
import { routes } from '@/lib/constants'
import getDirectusGlobals from '@/lib/directusGlobals'

export default async function Hero({ isConnected }: { isConnected: boolean }) {
	//const t = useTranslations()
	const locale = getLocale()
	const t = await getTranslations({ locale })
	//const messages = (await getMessages()) as any
	//console.log('Messages: %o', messages)
	//<div>{t('hello')}</div>
	const global = await getDirectusGlobals()
	const name = 'marsender'

	return (
		<div className="p-4 m-auto max-w-5xl pt-20 pb-20 text-gray-900 w-full h-full flex max-lg:flex-col">
			<section className="pr-8 flex justify-center lg:text-start text-center flex-col flex-1 h-full">
				<h1 className="text-4xl xl:text-5xl font-black leading-normal">{global?.title}</h1>
				<h2 className="mt-4 text-2xl font-[300]">{global?.description}</h2>
				<div className="pt-10 justify-center lg:justify-start flex gap-4">
					{isConnected ? (
						<CustomLink href="/teams" size="lg" icon={<User size={48} />}>
							Go to Dashboard: {t('Hero.welcome', { name })}
						</CustomLink>
					) : (
						<CustomLink href={routes.LOGIN} size="lg">
							{t('Navigation.login')}
						</CustomLink>
					)}
					<CustomLink href={routes.ABOUT} size="lg" variant="outline">
						{t('Navigation.about')}
					</CustomLink>
				</div>
			</section>
			<section className="flex-1 flex justify-center lg:justify-end max-lg:mt-12">
				<Image priority src="/window.svg" className=" object-cover h-auto relative w-full max-w-[496px]" width={100} height={0} alt="Hero svg" />
			</section>
		</div>
	)
}
