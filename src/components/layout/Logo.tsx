import clsx from 'clsx'

import BrandLogo from './BrandLogo'

const Logo = (props: { className?: string }) => {
	const developmentMode = process.env.NODE_ENV === 'development'

	return (
		<span className={clsx('flex items-center gap-2 pt-2 text-black dark:text-white', props.className)}>
			<BrandLogo fill={developmentMode ? '#dc2828' : 'currentColor'} />

			{false && developmentMode ? (
				<span
					className={clsx(`text-xl font-extrabold`, props.className, {
						'text-red-600': developmentMode,
						'text-gray-900': !developmentMode,
					})}
				>
					dev mode
				</span>
			) : null}
		</span>
	)
}

export default Logo
