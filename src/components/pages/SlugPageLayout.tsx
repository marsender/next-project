import SectionHero from '@/components/home/SectionHero'
import SectionRichText from '@/components/home/SectionRichText'
import DangerousHtml from '@/components/ui/dangerousHtml'
import type { BlockHero, BlockRichText, Page } from '@/lib/directusPageTypes'

type Props = {
	page: Page
}

const SlugPageLayout = ({ page }: Props) => {
	return (
		<div className="flex h-full flex-1 flex-col">
			<section className="blocks bg-background flex flex-1 justify-center">
				<div className="text-foreground m-auto h-full w-full max-w-5xl flex-col p-4">
					<section className="flex h-full flex-1 flex-col justify-center text-center lg:text-start">
						<h1 className="mb-4 text-4xl leading-normal font-black xl:text-5xl">{page.title}</h1>
						<DangerousHtml html={page.content} />
					</section>
				</div>
			</section>
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
		</div>
	)
}

export default SlugPageLayout
