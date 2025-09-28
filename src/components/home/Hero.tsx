import { User } from 'lucide-react'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import CustomLink from '@/components/CustomLink'
import { routes } from '@/lib/constants'
import directusGlobal from '@/lib/directusGlobal'
import type { Global } from '@/lib/directusGlobalTypes'

export default async function Hero({ isConnected }: { isConnected: boolean }) {
	const developmentMode = process.env.NODE_ENV === 'development'
	const locale = await getLocale()
	const t = await getTranslations({ locale })
	const global: Global = await directusGlobal()

	return (
		<div className="text-foreground m-auto flex h-full w-full max-w-5xl p-4 pt-10 max-lg:flex-col">
			<section className="flex h-full flex-1 flex-col justify-center pt-8 pb-8 text-center lg:text-start">
				<h1 className="mb-4 text-4xl leading-normal font-black xl:text-5xl">{global.title}</h1>
				<h2 className="mb-4 text-2xl font-[300]">{global.description}</h2>
				<div className="flex justify-center gap-4 pt-10 lg:justify-start">
					{isConnected ? null : (
						<CustomLink
							href="https://cal.opale-concept.com/didier.corbiere/meeting"
							size="lg"
							variant="solid"
							icon={<User size={48} />}
							blankTarget={true}
						>
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
			<section className="flex flex-1 justify-center max-lg:mt-4 lg:justify-end">
				<Image
					priority
					src="/beach.avif"
					className="relative h-auto w-full max-w-[400px] rounded-lg object-cover"
					width={1500}
					height={1500}
					alt="Hero svg"
				/>
			</section>
		</div>
	)
}
