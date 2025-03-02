import { Session } from 'next-auth'

import Hero from '@/components/home/Hero'
import HomeOpenSource from '@/components/home/HomeOpenSource'
import HomeSteps from '@/components/home/HomeSteps'

const HomePage = ({ user }: { user?: Session['user'] }) => {
	return (
		<div className="flex flex-1 flex-col h-full">
			<section className="flex flex-1 justify-center bg-white">
				<Hero isConnected={Boolean(user)} />
			</section>
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
