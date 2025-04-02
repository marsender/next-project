import DangerousHtml from '@/components/ui/dangerousHtml'
import { BlockRichText } from '@/lib/directusPage'

type Props = {
	block: BlockRichText
}

const SectionRichText = ({ block }: Props) => {
	return (
		<section className="flex flex-1 justify-center p-8 bg-white">
			<div className="max-w-5xl w-full">
				<h2 className="text-3xl font-bold mb-4">{block.headline}</h2>
				<DangerousHtml html={block.content} />
			</div>
		</section>
	)
}

export default SectionRichText
