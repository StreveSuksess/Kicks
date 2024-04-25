import styles from './OkPopup.module.scss'
import { FC } from 'react'

export const OkPopup: FC = () => {
	return (
		<div className={styles.main}>
			<div className={styles.content}>
				<div className={styles.checkSvg}>
					<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
						<path d='M20 6L9 17L4 12' stroke='#43A047' />
					</svg>
				</div>
				<h3>Thanks</h3>
				<p>Your fake order notification is already at your email address!</p>
			</div>
		</div>
	)
}