import styles from './Profile.module.scss'
import { authApi } from '../../services/authApi.ts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Loading } from '../Loading/Loading.tsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Carousel } from '../Carousel/Carousel.tsx'

export const Profile = () => {
	const authState = useAuthState(getAuth())
	const navigate = useNavigate()
	const { data: user, isLoading } = authApi.useFetchProfileInfoQuery(authState[0] ? authState[0]?.uid : '')
	const [logoutUser, {}] = authApi.useLogoutUserMutation()

	useEffect(() => {
		if (!authState[1] && authState[0] === null) navigate('/Kicks/login')
	}, [authState])

	if (isLoading) return <Loading />
	else if (user) {
		return (
			<div className={styles.profile + ' container'}>
				<h1 className={styles.title}>Hi, {user.firstName}</h1>
				<div className={styles.details}>
					<h2 className={styles.detailsTitle}>Details</h2>
					<p>{user.firstName + ' ' + user.lastName}</p>
				</div>
				<div className={styles.details}>
					<h2 className={styles.detailsTitle}>Email Details</h2>
					<p>{user.email}</p>
				</div>
				<div className={styles.details}>
					<h2 className={styles.detailsTitle}>Your ID</h2>
					<p>{authState[0]?.uid}</p>
				</div>
				<button onClick={() => logoutUser(null)} className={styles.logoutButton}>Logout</button>
				<Carousel />
			</div>
		)
	}
}
