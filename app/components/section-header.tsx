import {type ReactNode} from 'react'

function SectionHeader({children}: {readonly children: ReactNode}) {
	return (
		<h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
			{children}{' '}
		</h2>
	)
}

export default SectionHeader
