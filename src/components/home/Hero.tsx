import { User } from 'lucide-react'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import CustomLink from '@/components/CustomLink'
import { routes } from '@/lib/constants'
import directusGlobal, { Global } from '@/lib/directusGlobal'

export default async function Hero({ isConnected }: { isConnected: boolean }) {
	const developmentMode = process.env.NODE_ENV === 'development'
	const locale = await getLocale()
	const t = await getTranslations({ locale })
	const global: Global = await directusGlobal()

	return (
		<div className="p-4 m-auto max-w-5xl pt-10 text-gray-900 w-full h-full flex max-lg:flex-col">
			<section className="flex justify-center lg:text-start text-center flex-col flex-1 h-full pt-8 pb-8">
				<h1 className="text-4xl xl:text-5xl font-black leading-normal mb-4">{global.title}</h1>
				<h2 className="text-2xl font-[300] mb-4">{global.description}</h2>
				<div className="pt-10 justify-center lg:justify-start flex gap-4">
					{isConnected ? null : (
						<CustomLink href="https://cal.opale-concept.com/didier.corbiere/meeting" size="lg" icon={<User size={48} />} blankTarget={true}>
							{t('Hero.contactMe')} &nbsp;
						</CustomLink>
					)}
					{false && developmentMode ? (
						<>
							<CustomLink href={routes.LOGIN} size="lg">
								{t('Navigation.login')}
							</CustomLink>
							<CustomLink href={routes.REGISTER} size="lg">
								{t('Navigation.register')}
							</CustomLink>
							<CustomLink href={routes.ABOUT} size="lg" variant="outline">
								{t('Navigation.about')}
							</CustomLink>
						</>
					) : null}
				</div>
			</section>
			<section className="flex flex-1 justify-center lg:justify-end max-lg:mt-4">
				<Image priority src="/beach.avif" className="object-cover h-auto relative w-full max-w-[400px] rounded-lg" width={1500} height={1500} alt="Hero svg" />
			</section>
		</div>
	)
}
