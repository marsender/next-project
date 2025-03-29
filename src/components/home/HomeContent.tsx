import SectionHero from '@/components/home/SectionHero'
import SectionRichText from '@/components/home/SectionRichText'
import { BlockHero, BlockRichText, Page } from '@/lib/directusPage'

type Props = {
	page: Page
}

const HomeContent = ({ page }: Props) => {
	return (
		<>
			<section className="flex flex-1 justify-center bg-white">
				<div className="p-4 m-auto max-w-5xl pt-20 pb-20 text-gray-900 w-full h-full flex max-lg:flex-col">
					<section className="flex justify-center lg:text-start text-center flex-col flex-1 h-full">
						<h1 className="text-4xl xl:text-5xl font-black leading-normal mb-4">{page.title}</h1>
						<div dangerouslySetInnerHTML={{ __html: page.content }}></div>
					</section>
				</div>
			</section>
			<section className="flex flex-1 justify-center bg-white">
				<div className="p-4 m-auto max-w-5xl pt-20 pb-20 text-gray-900 w-full h-full flex max-lg:flex-col">
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
		</>
	)
}

export default HomeContent
