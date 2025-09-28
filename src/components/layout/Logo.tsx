import clsx from 'clsx'

import BrandLogo from './BrandLogo'

const Logo = (props: { className?: string; isWhite?: boolean }) => {
	const developmentMode = process.env.NODE_ENV === 'development'
	const color = props.isWhite ? 'white' : 'black'

	return (
		<span className={clsx('flex items-center gap-2 pt-2')}>
			{/* Pierre hack: fill='currentColor' */}
			<BrandLogo fill={developmentMode ? '#dc2828' : color} />

			{false && developmentMode ? (
				<span
					className={clsx(`text-xl font-[800]`, props.className, {
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
