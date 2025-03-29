import { Page } from '@/lib/directusPage'

import SectionColumn from './SectionColumn'

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
