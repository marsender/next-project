import Image from 'next/image'
import React from 'react'

import SectionColumn from './SectionColumn'

type StepProps = {
	title: string
	img: string
	description: string
}

const Step = ({ title, img, description }: StepProps) => (
	<div className="xs:flex-row xs:space-x-8 max-xs:items-center flex flex-col space-y-8 lg:flex-col lg:space-y-8 lg:space-x-0">
		<Image src={img} alt={img} width={70} height={0} className="xs:w-[13rem] relative w-3/5" />
		<div className="xs:text-left text-center">
			<span className="mb-3 inline-block border-b-4 border-b-black pt-4 pr-5 pb-1 text-2xl font-extrabold">
				{title}
			</span>
			<div className="text-base">{description}</div>
		</div>
	</div>
)

const HomeSteps = () => {
	return (
		<SectionColumn
			title="Supercharge your Team knowledge"
			caption="Easily capture valuable links, categorize resources for efficient access, and distribute curated content seamlessly with our digest feature."
			className="max-w-5xl"
		>
			<div className="flex max-lg:flex-col max-lg:space-y-12 lg:space-x-10">
				<Step
					title="1. Collect Links"
					img="/vercel.svg"
					description={'Add links manually or synchronize your account with external services'}
				/>
				<Step
					title="2. Organize"
					img="/vercel.svg"
					description={'Make your personal selection of interesting content you want to share'}
				/>
				<Step
					title="3. Share Digest"
					img="/vercel.svg"
					description={'Share your digest with a public link or via the newsletter feature'}
				/>
			</div>
		</SectionColumn>
	)
}

export default React.memo(HomeSteps)
