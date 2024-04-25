import { FC } from 'react'
import styles from './Discount.module.scss'

export const Discount: FC = () => {
	return (
		<div className={styles.discount}>
			<div className={styles.content}>
				<span className={styles.supText}>Limited time only</span>
				<h1 className={styles.title}>Get 30% off</h1>
				<p className={styles.p}>Sneakers made with your comfort in mind so you can put all of your focus into your next
					session.</p>
			</div>
		</div>
	)
}
