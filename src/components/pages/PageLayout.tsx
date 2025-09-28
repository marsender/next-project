import { ReactNode } from 'react'

type Props = {
	title: ReactNode
	subtitle?: ReactNode
	children?: ReactNode
}

export default function PageLayout({ title, subtitle, children }: Props) {
	return (
		<div className="flex h-full flex-1 flex-col">
			<section className="bg-background flex flex-1 justify-center">
				<div className="text-foreground m-auto h-full w-full max-w-5xl flex-col p-4 pt-10 pb-10">
					<section className="flex h-full flex-1 flex-col justify-center text-center lg:text-start">
						<h1 className="mb-4 text-4xl leading-normal font-black xl:text-5xl">{title}</h1>
						{subtitle && <h2 className="mb-4 text-2xl font-[300]">{subtitle}</h2>}
						{children && <div className="md:text-lg">{children}</div>}
					</section>
				</div>
			</section>
		</div>
	)
}
