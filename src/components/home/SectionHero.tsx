import Image from 'next/image'

import DangerousHtml from '@/components/ui/dangerousHtml'
import { getAssetURL } from '@/lib/directus'
import type { BlockHero } from '@/lib/directusPageTypes'

type Props = {
	block: BlockHero
}

const SectionHero = ({ block }: Props) => {
	return (
		<section className="flex flex-1 justify-center rounded-xl p-8">
			<div className="w-full max-w-5xl">
				<h2 className="mb-4 text-3xl font-bold">{block.headline}</h2>
				<DangerousHtml html={block.content} />
				{block.image && (
					<div className="mt-4">
						<Image
							src={getAssetURL(block.image)}
							alt={block.headline}
							width={800}
							height={400}
							className="rounded-lg"
						/>
					</div>
				)}
			</div>
		</section>
	)
}

export default SectionHero
