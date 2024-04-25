import styles from '../../../scss/Auth.module.scss'
import image from '../../../assets/leftFormImg.png'
import { useForm } from 'react-hook-form'
import { authApi } from '../../../services/authApi.ts'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import { AlreadyLogged } from '../AlreadyLogged/AlreadyLogged.tsx'
import { loginData } from '../../../interfaces/IAuth.ts'
import { Link } from 'react-router-dom'

export const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<loginData>()
	const [loginUser, { isSuccess }] = authApi.useLoginUserMutation()
	const navigate = useNavigate()
	const authState = useAuthState(getAuth())

	const onSubmit = handleSubmit((data) => {
		loginUser(data)
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
					<h1 className={styles.title}>Login</h1>
					<form className={styles.form} onSubmit={onSubmit}>
						<div className={styles.group}>
							<input type='email' placeholder='Email' {...register('email', { required: true })} />
							{errors?.email && <span className={styles.error}>⚠ Required</span>}
							<input type='password'
										 placeholder='Password' {...register('password', { required: true, minLength: 6 })} />
							{errors?.password && <span
								className={styles.error}>{errors?.password.type == 'required' ? '⚠ Required' : '⚠ Min length - 6'}</span>}
						</div>
						<button type='submit'>
							<span>Login</span>
							<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
								<path d='M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125' stroke='white' />
							</svg>
						</button>
						<Link className={styles.link} to='/Kicks/register'>Haven't account? Register</Link>
					</form>
				</div>
			</div>
		</div>
	)
}