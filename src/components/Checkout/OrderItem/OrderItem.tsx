import styles from './OrderItem.module.scss'
import { FC } from 'react'
import { ICartItem } from '../../../interfaces/ICart.ts'

type Props = {
	size: number,
	quantity: number
} & ICartItem

export const OrderItem: FC<Props> = (props) => {
	return (
		<article className={styles.item}>
			<img src={props.previewImage} alt='' />
			<div className={styles.content}>
				<h5 className={styles.title}>{props.name}</h5>
				<p className={styles.type}>{props.gender}'s {props.shoesType} Shoes</p>
				<p className={styles.color}>{props.color}</p>
				<div className={styles.sizeAndQuantity}>
					<span className={styles.size}>Size {props.size}</span>
					<span className={styles.quantity}>Quantity {props.quantity}</span>
				</div>
				<span className={styles.price}>${props.price}</span>
			</div>
		</article>
	)
}
