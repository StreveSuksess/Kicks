import { Dispatch, FC, useState } from 'react'
import styles from './Dropdown.module.scss'

type Props = {
	value: string,
	setValue: Dispatch<string>,
	valuesArr: string[]
}

export const Dropdown: FC<Props> = (props) => {
	const [show, setShow] = useState(false)

	return (
		<div className={styles.dropdown}>
			<div className={styles.main} onClick={() => setShow(show => !show)}>
				<span>{props.value}</span>
				<svg className={show ? styles.rotate : ''} xmlns='http://www.w3.org/2000/svg' width='24' height='25'
						 viewBox='0 0 24 25' fill='none'>
					<path d='M5.25 9.5L12 16.25L18.75 9.5' stroke='#232321' />
				</svg>
			</div>
			<div className={show ? styles.show + ' ' + styles.menu : styles.menu}>
				{props.valuesArr.map(value => <button key={value} disabled={!show} onClick={() => {
					props.setValue(value)
					setShow(false)
				}}>{value}</button>)}
			</div>
		</div>
	)
}
