import { ReactNode } from 'react'

type Props = {
	title: ReactNode
	subtitle?: ReactNode
	children?: ReactNode
}

export default function PageLayout({ title, subtitle, children }: Props) {
	return (
		<div className="flex flex-1 flex-col h-full">
			<section className="flex flex-1 justify-center bg-white">
				<div className="p-4 m-auto max-w-5xl pt-10 pb-10 text-gray-900 w-full h-full flex max-lg:flex-col">
					<section className="flex justify-center lg:text-start text-center flex-col flex-1 h-full">
						<h1 className="text-4xl xl:text-5xl font-black leading-normal mb-4">{title}</h1>
						{subtitle && <h2 className="text-2xl font-[300] mb-4">{subtitle}</h2>}
						{children && <div className="md:text-lg">{children}</div>}
					</section>
				</div>
			</section>
		</div>
	)
}
