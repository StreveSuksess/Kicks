import styles from '../../../scss/Auth.module.scss'
import image from '../../../assets/leftFormImg.png'
import { useForm } from 'react-hook-form'
import { registerData } from '../../../interfaces/IAuth.ts'
import { authApi } from '../../../services/authApi.ts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AlreadyLogged } from '../AlreadyLogged/AlreadyLogged.tsx'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'

export const Register = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<registerData>()
	const navigate = useNavigate()
	const [registerUser, { isSuccess }] = authApi.useRegisterUserMutation()
	const authState = useAuthState(getAuth())

	const onSubmit = handleSubmit(async (registerData) => {
		registerUser(registerData)
	})

	useEffect(() => window.scrollTo(0, 100), [])

	useEffect(() => {
		isSuccess && navigate('/Kicks/')
	}, [isSuccess])

	if (authState[0]?.uid) return <AlreadyLogged />
	return (
		<div className={styles.register + ' container'}>
			<div className={styles.left}>
				<img src={image} alt='' />
			</div>
			<div className={styles.right}>
				<div className={styles.content}>
					<h1 className={styles.title}>Register</h1>
					<form className={styles.form} onSubmit={onSubmit}>
						<div className={styles.group}>
							<h2 className={styles.groupTitle}>Your Name</h2>
							<input type='text'
										 placeholder='First name' {...register('firstName', { required: true, maxLength: 20 })} />
							{errors?.firstName && <span
								className={styles.error}>{errors?.firstName.type == 'required' ? '⚠ Required' : '⚠ Max length - 20'}</span>}
							<input type='text' placeholder='Last name' {...register('lastName', { required: true, maxLength: 20 })} />
							{errors?.lastName && <span
								className={styles.error}>{errors?.lastName.type == 'required' ? '⚠ Required' : '⚠ Max length - 20'}</span>}
						</div>
						<div className={styles.group}>
							<h2 className={styles.groupTitle}>Login Details</h2>
							<input type='email' placeholder='Email' {...register('email', { required: true })} />
							{errors?.email && <span className={styles.error}>⚠ Required</span>}
							<input type='password'
										 placeholder='Password' {...register('password', { required: true, minLength: 6 })} />
							{errors?.password && <span
								className={styles.error}>{errors?.password.type == 'required' ? '⚠ Required' : '⚠ Min length - 6'}</span>}
						</div>
						<button type='submit'>
							<span>Register</span>
							<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
								<path d='M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125' stroke='white' />
							</svg>
						</button>
						<Link className={styles.link} to='/Kicks/login'>Already have account? Log in</Link>
					</form>
				</div>
			</div>
		</div>
	)
}