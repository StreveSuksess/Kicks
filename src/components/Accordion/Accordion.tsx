import { FC, ReactNode, useState } from 'react'
import styles from './Accordion.module.scss'

type Props = {
	title: string,
	children: ReactNode
}

export const Accordion: FC<Props> = (props) => {
	const [active, setActive] = useState(true)

	return (
		<div className={styles.accordion}>
			<div className={styles.header} onClick={() => {
				setActive(active => !active)
			}}>
				<h5 className={styles.title}>{props.title}</h5>
				<svg className={active ? '' : styles.reverse} width='24' height='24' viewBox='0 0 24 24' fill='none'>
					<path d='M5.25 15.75L12 9L18.75 15.75' stroke='#232321' />
				</svg>
			</div>
			<div className={active ? styles.content + ' ' + styles.show : styles.content + ' ' + styles.nonShow}>
				{props.children}
			</div>
		</div>
	)
}
