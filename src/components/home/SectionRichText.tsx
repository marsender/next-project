import DangerousHtml from '@/components/ui/dangerousHtml'
import type { BlockRichText } from '@/lib/directusPageTypes'

type Props = {
	block: BlockRichText
}

const SectionRichText = ({ block }: Props) => {
	return (
		<section className="bg-background flex flex-1 justify-center p-8">
			<div className="w-full max-w-5xl">
				<h2 className="mb-4 text-3xl font-bold">{block.headline}</h2>
				<DangerousHtml html={block.content} />
			</div>
		</section>
	)
}

export default SectionRichText
