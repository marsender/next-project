import Image from 'next/image'

import { getAssetURL } from '@/lib/directus'
import { BlockHero } from '@/lib/directusPage'

type Props = {
	block: BlockHero
}

const SectionHero = ({ block }: Props) => {
	return (
		<section className="flex flex-1 justify-center p-8 bg-gray-100">
			<div className="max-w-5xl w-full">
				<h2 className="text-3xl font-bold mb-4">{block.headline}</h2>
				<div dangerouslySetInnerHTML={{ __html: block.content }}></div>
				{block.image && (
					<div className="mt-4">
						<Image src={getAssetURL(block.image)} alt={block.headline} width={800} height={400} className="rounded-lg" />
					</div>
				)}
			</div>
		</section>
	)
}

export default SectionHero
