import styles from './Loading.module.scss'

export const Loading = () => {
	return (
		<div className={styles.loading + ' withStartAnim'}>
			<span className={styles.loader}></span>
		</div>
	)
}