import clsx from 'clsx'
import { ReactNode } from 'react'

import SectionTitle from './SectionTitle'

type Props = {
	children: ReactNode
	title: ReactNode
	caption?: ReactNode
	dangerousHtml?: string
	className?: string
}

const SectionColumn = ({ children, title, caption, dangerousHtml, className }: Props) => {
	return (
		<div className={clsx(`p-4 m-auto max-w-5xl pt-10 pb-10 text-gray-900 w-full h-full flex flex-col items-center gap-16`, className)}>
			<div className="flex flex-col gap-2">
				<SectionTitle>{title}</SectionTitle>
				{Boolean(caption) && <p className="mt-4 text-lg text-slate-700 mx-auto max-w-2xl text-center">{caption}</p>}
				{Boolean(dangerousHtml) && <p className="mt-4 text-lg text-slate-700 mx-auto max-w-2xl text-center" dangerouslySetInnerHTML={{ __html: dangerousHtml as string }} />}
			</div>
			{children}
		</div>
	)
}

export default SectionColumn
