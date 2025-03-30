import SectionHero from '@/components/home/SectionHero'
import SectionRichText from '@/components/home/SectionRichText'
import { BlockHero, BlockRichText, Page } from '@/lib/directusPage'

type Props = {
	page: Page
}

const HomeBlocks = ({ page }: Props) => {
	return (
		<section className="blocks flex flex-1 justify-center bg-white">
			<div className="p-4 m-auto max-w-5xl pt-10 pb-10 text-gray-900 w-full h-full flex-col">
				{page.blocks.map((block, index) => {
					switch (block.collection) {
						case 'block_hero': {
							return <SectionHero key={index} block={block as BlockHero} />
						}
						case 'block_richtext': {
							return <SectionRichText key={index} block={block as BlockRichText} />
						}
						default: {
							return null
						}
					}
				})}
			</div>
		</section>
	)
}

export default HomeBlocks
