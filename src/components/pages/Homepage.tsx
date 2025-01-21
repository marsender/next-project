import Hero from '@/components/home/Hero'
import { Session } from 'next-auth'
import HomeOpenSource from '@/components/home/HomeOpenSource'
import HomeSteps from '@/components/home/HomeSteps'

const Homepage = ({ user }: { user?: Session['user'] }) => {
	return (
		<div className="flex-1 flex flex-col h-full">
			<section className="bg-white flex flex-1 justify-center">
				<Hero isConnected={Boolean(user)} />
			</section>
			<section className="flex-1 flex justify-center pb-8 bg-slate-100">
				<HomeSteps />
			</section>
			<section className="bg-white flex flex-1 justify-center">
				<HomeOpenSource />
			</section>
		</div>
	)
}

export default Homepage
