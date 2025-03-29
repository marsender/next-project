import SectionColumn from './SectionColumn'
import { Page } from '@/lib/directusPage'

type Props = {
	page: Page
}

const HomeLead = ({ page }: Props) => {
	return (
		<SectionColumn title={page.title} dangerousHtml={page.content} className="max-w-5xl gap-8">
			<></>
		</SectionColumn>
	)
}

export default HomeLead
