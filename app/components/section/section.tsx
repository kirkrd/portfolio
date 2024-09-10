import {motion} from 'framer-motion'
import {type ReactNode} from 'react'

export function Section({children}: {readonly children: ReactNode}) {
	return (
		<motion.section
			initial={{opacity: 0}}
			whileInView={{opacity: 1}}
			className="flex flex-col gap-2"
			viewport={{once: true}}
		>
			{children}
		</motion.section>
	)
}
