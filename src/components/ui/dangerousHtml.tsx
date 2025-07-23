import clsx from 'clsx'
import React from 'react'

interface Props {
	html: string | undefined
	className?: string
}

const DangerousHtml: React.FC<Props> = ({ html, className }) => {
	if (!html) return null
	return <div className={clsx('text-lg', className)} dangerouslySetInnerHTML={{ __html: html }} />
}

export default DangerousHtml
