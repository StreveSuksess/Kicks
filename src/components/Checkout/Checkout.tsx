import styles from './Checkout.module.scss'
import { useForm } from 'react-hook-form'
import { OrderItem } from './OrderItem/OrderItem.tsx'
import emailjs from '@emailjs/browser'
import { FC, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { useNavigate, useParams } from 'react-router'
import { OkPopup } from './OkPopup/OkPopup.tsx'
import { useActions } from '../../hooks/useActions.ts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

export const Checkout: FC = () => {
	const authState = useAuthState(getAuth())
	const { register, handleSubmit } = useForm<any>()
	const [showPopup, setShowPopup] = useState(false)
	const navigate = useNavigate()
	const { cleanCart } = useActions()

	const params = useParams()
	const buyNowItem = useAppSelector((state) => state.cart.buyNowItem)
	const order = params.buyNow === 'buyNow' && buyNowItem ? [buyNowItem] : useAppSelector((state) => state.cart.items)
	const orderSummary: number = order.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0)
	const deliveryCost: number = 6.99
	const form = useRef(null)

	useEffect(() => {
		if (!authState[1] && authState[0] === null) navigate('/Kicks/login')
	}, [authState])

	const onSubmit = handleSubmit(() => {
		emailjs.sendForm('service_gz2dk11', 'template_pfnizf5', form?.current ? form?.current : '', 'AO6Ldt_npaVVJxwkm')
			.then(() => {
				setShowPopup(true)
				setTimeout(() => {
					if (params.buyNow !== 'buyNow') cleanCart()
					navigate('/Kicks/listing')
				}, 3000)
			}, (error) => {
				console.log(error.text)
			})
	})

	return (
		<>
			{showPopup && <OkPopup />}
			<form ref={form} onSubmit={onSubmit} className={styles.checkout + ' container'}>
				<div className={styles.content}>
					<div className={styles.left}>
						<div className={styles.leftGroup + ' ' + styles.contact}>
							<h2 className={styles.title}>Contact details</h2>
							<p>We will use these details to keep you inform about your delivery</p>
							<input type='email' className={styles.email}
										 placeholder='Email' {...register('email', { required: true })} />
						</div>
						<div className={styles.leftGroup + ' ' + styles.shipping}>
							<h2 className={styles.title}>Shipping Address</h2>
							<div className={styles.shippingInputs}>
								<div className={styles.nameInputs}>
									<input type='text' placeholder='First Name'
												 {...register('firstName', { required: true })} />
									<input type='text' placeholder='Last Name'
												 {...register('lastName', { required: true })} />
								</div>
								<input type='text' placeholder='Find Delivery Address'
											 className={styles.address} {...register('address', { required: true })} />
								<span className={styles.inputAfter}>Start typing your street address or zip code for suggestion</span>
								<input type='tel' placeholder='Phone number'
											 className={styles.phone} {...register('phone', { required: true })} />
							</div>
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.rightGroup}>
							<h2 className={styles.title}>Order Summary</h2>
							<div className={styles.orderSummary}>
								<div>
									<span>{order.length} item</span>
									<span>${orderSummary}</span>
								</div>
								<div>
									<span>Delivery</span>
									<span>${deliveryCost}</span>
								</div>
								<div className={styles.total}>
									<span>Total</span>
									<span>${orderSummary + deliveryCost}</span>
								</div>
							</div>
						</div>
						<div className={styles.rightGroup}>
							<h3>Order Details</h3>
							<div className={styles.orderList}>
								{order.map((orderItem) => <OrderItem {...orderItem} key={orderItem.id} />)}
							</div>
						</div>
					</div>
				</div>
				<button onClick={() => {

				}} type='submit' className={styles.button}>Review AND PAY
				</button>
			</form>
		</>
	)
}
