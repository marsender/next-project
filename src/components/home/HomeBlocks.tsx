import SectionHero from '@/components/home/SectionHero'
import SectionRichText from '@/components/home/SectionRichText'
import type { BlockHero, BlockRichText, Page } from '@/lib/directusPageTypes'

type Props = {
	page: Page
}

const HomeBlocks = ({ page }: Props) => {
	return (
		<section className="blocks bg-background flex flex-1 justify-center">
			<div className="text-foreground m-auto h-full w-full max-w-5xl flex-col p-4">
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
