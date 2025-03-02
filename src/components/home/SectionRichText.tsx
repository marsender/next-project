import { BlockRichText } from '@/lib/directusPage'

type Props = {
	block: BlockRichText
}

const SectionRichText = ({ block }: Props) => {
	return (
		<section className="bg-white flex flex-1 justify-center p-8">
			<div className="max-w-5xl w-full">
				<h2 className="text-3xl font-bold mb-4">{block.headline}</h2>
				<div dangerouslySetInnerHTML={{ __html: block.content }}></div>
			</div>
		</section>
	)
}

export default SectionRichText
