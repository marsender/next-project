import { Session } from 'next-auth'

import Hero from '@/components/home/Hero'
import HomeContent from '@/components/home/HomeContent'
import HomeOpenSource from '@/components/home/HomeOpenSource'
import HomeSteps from '@/components/home/HomeSteps'
import { Page } from '@/lib/directusPage'

type Props = {
	page: Page
	user?: Session['user']
}

const HomePage = ({ page, user }: Props) => {
	return (
		<div className="flex flex-1 flex-col h-full">
			<section className="flex flex-1 justify-center bg-white">
				<Hero isConnected={Boolean(user)} />
			</section>
			<HomeContent page={page} />
			<section className="flex flex-1 justify-center bg-slate-100">
				<HomeSteps />
			</section>
			<section className="flex flex-1 justify-center bg-white">
				<HomeOpenSource />
			</section>
		</div>
	)
}

export default HomePage
