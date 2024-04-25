import styles from './Cart.module.scss'
import { CartItem } from './CartItem/CartItem.tsx'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { Carousel } from '../Carousel/Carousel.tsx'

export const Cart = () => {
	const cartItems = useAppSelector((state) => state.cart.items)

	const deliveryCost: number = 6.99
	const cartItemsCost: number = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0)


	return (
		<div className={styles.cart + ' container'}>
			<div className={styles.topText}>
				<h3 className={styles.title}>Saving to celebrate</h3>
				<p className={styles.p}>Enjoy up to 60% off thousands of styles during the End of Year sale - while suppiles
					last. No code needed.</p>
			</div>

			<div className={styles.content}>
				<div className={styles.bag}>
					<h4 className={styles.bagTitle}>Your Bag {!cartItems.length && 'is empty'}</h4>
					<p className={styles.bagP}>Items in your bag not reserved- check out now to make them yours.</p>
					<div className={styles.cartItems}>
						{cartItems.map(item => <CartItem key={item.id} {...item} />)}
					</div>
				</div>
				{!!cartItems.length &&
					<div className={styles.summary}>
						<h4 className={styles.summaryTitle}>Order Summary</h4>
						<div className={styles.summaryGroup}>
							<span>{cartItems.length} item</span>
							<span>${cartItemsCost}</span>
						</div>
						<div className={styles.summaryGroup}>
							<span>Delivery</span>
							<span>${deliveryCost}</span>
						</div>
						<div className={styles.total}>
							<span className={styles.text}>Total</span>
							<span className={styles.totalCost}>${deliveryCost + cartItemsCost}</span>
						</div>
						<Link to='/Kicks/checkout' className={styles.checkoutLink}>checkout</Link>
					</div>
				}
			</div>
			<Carousel />
		</div>
	)
}
