import clsx from 'clsx'

import BrandIcon from './BrandIcon'

const Logo = (props: { className?: string; isWhite?: boolean }) => {
	const developmentMode = false //process.env.NODE_ENV === 'development'
	const color = props.isWhite ? 'white' : 'black'

	return (
		<span className={clsx('flex items-center cursor-pointer gap-2 pt-2')}>
			{/* Pierre hack: fill='currentColor' */}
			<BrandIcon fill={developmentMode ? '#dc2828' : color} />

			{developmentMode && (
				<span
					className={clsx(`text-xl font-[800] `, props.className, {
						'text-red-600': developmentMode,
						'text-gray-900': !developmentMode,
					})}
				>
					dev mode
				</span>
			)}
		</span>
	)
}

export default Logo
