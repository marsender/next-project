'use client'
import clsx from 'clsx'
import BrandIcon from './BrandIcon'

const Logo = (props: { className?: string; isWhite?: boolean }) => {
	const devMode = false //process.env.NODE_ENV === 'development'

	return (
		<span className={clsx('flex items-center cursor-pointer gap-2')}>
			{/* Pierre hack: fill='currentColor' */}
			<BrandIcon fill={devMode ? '#dc2828' : props.isWhite ? 'white' : 'black'} />

			{devMode && (
				<span
					className={clsx(`text-xl font-[800] `, props.className, {
						'text-red-600': devMode,
						'text-gray-900': !devMode,
					})}
				>
					dev mode
				</span>
			)}
		</span>
	)
}

export default Logo
