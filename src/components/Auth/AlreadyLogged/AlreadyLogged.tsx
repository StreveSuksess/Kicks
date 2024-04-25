import styles from '../../../scss/Auth.module.scss'
import { authApi } from '../../../services/authApi.ts'

export const AlreadyLogged = () => {
	const [logoutUser, {}] = authApi.useLogoutUserMutation()

	return (
		<div className={styles.loggedContainer + ' container'}>
			<h1 className={styles.loggedTitle}>You've already logged into Kicks</h1>
			<button onClick={() => logoutUser(null)} className={styles.logoutButton}>logout</button>
		</div>
	)
}
