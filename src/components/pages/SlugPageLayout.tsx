import SectionHero from '@/components/home/SectionHero'
import SectionRichText from '@/components/home/SectionRichText'
import DangerousHtml from '@/components/ui/dangerousHtml'
import { BlockHero, BlockRichText, Page } from '@/lib/directusPage'

type Props = {
	page: Page
}

const SlugPageLayout = ({ page }: Props) => {
	return (
		<div className="flex flex-1 flex-col h-full">
			<section className="blocks flex flex-1 justify-center bg-white">
				<div className="p-4 m-auto max-w-5xl text-gray-900 w-full h-full flex-col">
					<section className="flex justify-center lg:text-start text-center flex-col flex-1 h-full">
						<h1 className="text-4xl xl:text-5xl font-black leading-normal mb-4">{page.title}</h1>
						<DangerousHtml html={page.content} />
					</section>
				</div>
			</section>
			<section className="blocks flex flex-1 justify-center bg-white">
				<div className="p-4 m-auto max-w-5xl text-gray-900 w-full h-full flex-col">
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
