import { Session } from 'next-auth'

import Hero from '@/components/home/Hero'
import HomeBlocks from '@/components/home/HomeBlocks'
import HomeLead from '@/components/home/HomeLead'
import HomeOpenSource from '@/components/home/HomeOpenSource'
import HomeSteps from '@/components/home/HomeSteps'
import type { Page } from '@/lib/directusPageTypes'

type Props = {
	page: Page
	user?: Session['user']
}

const HomePage = ({ page, user }: Props) => {
	return (
		<div className="flex h-full flex-1 flex-col">
			<section className="bg-background flex flex-1 justify-center">
				<Hero isConnected={Boolean(user)} />
			</section>
			<section className="bg-background flex flex-1 justify-center">
				<HomeLead page={page} />
			</section>
			<HomeBlocks page={page} />
			{false ? (
				<section className="bg-background flex flex-1 justify-center">
					<HomeSteps />
				</section>
			) : null}
			<section className="bg-background flex flex-1 justify-center bg-gray-100 dark:bg-gray-800">
				<HomeOpenSource />
			</section>
		</div>
	)
}

export default HomePage
