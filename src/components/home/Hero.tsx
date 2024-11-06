import { routes } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import CustomLink from '@/components/CustomLink'
import { User } from 'lucide-react'

async function getGlobals() {
	return directus.request(readItems('global'))
}

export default async function Hero({ isConnected }: { isConnected: boolean }) {
	const global = await getGlobals()

	return (
		<div className="p-4 m-auto max-w-5xl pt-20 pb-20 text-gray-900 w-full h-full flex max-lg:flex-col">
			<section className="flex justify-center lg:text-start text-center flex-col flex-1 h-full">
				<h1 className="text-4xl xl:text-5xl font-black leading-normal">{global.title}</h1>
				<h2 className="mt-4 text-2xl font-[300]">{global.description}</h2>
				<div className="pt-10 justify-center lg:justify-start flex gap-4">
					{isConnected ? (
						<CustomLink href="/teams" size="lg" icon={<User size={48} />}>
							Go to Dashboard
						</CustomLink>
					) : (
						<CustomLink href={routes.LOGIN} size="lg">
							Login
						</CustomLink>
					)}
					<CustomLink href={routes.ABOUT} size="lg" variant="outline">
						About
					</CustomLink>
				</div>
			</section>
			<section className="flex-1 flex justify-center lg:justify-end max-lg:mt-12">
				<Image priority src="/hero.svg" className=" object-cover h-auto relative w-full max-w-[496px]" width={100} height={0} alt="Hero svg" />
			</section>
		</div>
	)
}
