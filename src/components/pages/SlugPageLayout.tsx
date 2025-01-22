import Image from 'next/image'

import { getAssetURL } from '@/lib/directus'

const SlugPageLayout = ({ page }: any) => {
	return (
		<div className="flex-1 flex flex-col h-full">
			<section className="bg-white flex flex-1 justify-center">
				<div className="p-4 m-auto max-w-5xl pt-20 pb-20 text-gray-900 w-full h-full flex max-lg:flex-col">
					<section className="pr-8 flex justify-center lg:text-start text-center flex-col flex-1 h-full">
						<h1 className="text-4xl xl:text-5xl font-black leading-normal">{page.title}</h1>
						<div dangerouslySetInnerHTML={{ __html: page.content }}></div>
					</section>
					<section className="flex-1 flex justify-center lg:justify-end max-lg:mt-12">
						<Image src={getAssetURL(page.blocks[0].item.image)} alt="" className=" object-cover h-auto relative w-full max-w-[496px]" width={100} height={0} sizes="100vw" loading="lazy" />
					</section>
				</div>
			</section>
		</div>
	)
}

export default SlugPageLayout
