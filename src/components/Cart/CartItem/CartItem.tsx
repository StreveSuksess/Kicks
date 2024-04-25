import styles from './CartItem.module.scss'
import { FC } from 'react'
import { ICartItem } from '../../../interfaces/ICart.ts'
import { useActions } from '../../../hooks/useActions.ts'

type Props = {
	size: number,
	quantity: number
} & ICartItem

export const CartItem: FC<Props> = (props) => {
	const { removeFromCart } = useActions()

	return (
		<article className={styles.item}>
			<img src={props.previewImage} alt='' />
			<div className={styles.content}>
				<div className={styles.titleWithPrice}>
					<h5 className={styles.title}>{props.name}</h5>
					<span className={styles.price}>${props.price}</span>
				</div>
				<p className={styles.type}>{props.gender}'s {props.shoesType} Shoes</p>
				<p className={styles.color}>{props.color}</p>
				<div className={styles.sizeAndQuantity}>
					<span className={styles.size}>Size {props.size}</span>
					<span className={styles.quantity}>Quantity {props.quantity}</span>
				</div>
				<span className={styles.mobilePrice}>${props.price}</span>
				<button onClick={() => removeFromCart({ id: props.id, size: props.size })} className={styles.remove}>
					<svg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'>
						<path
							d='M27.8184 9L26.0265 26.2337C25.9692 26.7203 25.7353 27.169 25.3692 27.4946C25.0031 27.8201 24.5302 28 24.0402 28H9.59711C9.10716 28 8.63426 27.8201 8.26813 27.4946C7.90201 27.169 7.66812 26.7203 7.61086 26.2337L5.81836 9'
							stroke='#232321' />
						<path
							d='M29.8184 4H3.81836C3.26607 4 2.81836 4.44772 2.81836 5V8C2.81836 8.55228 3.26607 9 3.81836 9H29.8184C30.3706 9 30.8184 8.55228 30.8184 8V5C30.8184 4.44772 30.3706 4 29.8184 4Z'
							stroke='#232321' />
						<path d='M20.3184 15L13.3184 22M20.3184 22L13.3184 15' stroke='#232321' />
					</svg>
				</button>
			</div>
		</article>
	)
}
