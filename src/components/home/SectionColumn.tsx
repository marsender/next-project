import clsx from 'clsx'
import { ReactNode } from 'react'

import DangerousHtml from '@/components/ui/dangerousHtml'

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
		<div
			className={clsx(
				`text-foreground m-auto flex h-full w-full max-w-5xl flex-col items-center p-4 pt-10 pb-10`,
				className,
			)}
		>
			<div className="flex flex-col gap-2">
				<SectionTitle>{title}</SectionTitle>
				{caption ? <p className="text-foreground mx-auto mt-4 max-w-2xl text-center text-lg">{caption}</p> : null}
				{dangerousHtml ? (
					<DangerousHtml html={dangerousHtml} className="text-foreground mx-auto mt-4 max-w-2xl text-center text-lg" />
				) : null}
			</div>
			{children}
		</div>
	)
}

export default SectionColumn
