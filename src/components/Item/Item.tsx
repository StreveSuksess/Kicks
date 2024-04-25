import { FC } from 'react'
import styles from './Item.module.scss'
import { item } from '../../interfaces/items.ts'
import { Link } from 'react-router-dom'

type Props = {
	new?: boolean,
} & item
export const Item: FC<Props> = (props) => {
	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				<img src={props.previewImage} alt='' />
				{props.new &&
					<span>New</span>
				}
			</div>
			<h3 className={styles.cardTitle}>{props.name}</h3>
			<Link to={`/Kicks/product/${props.id}`} className={styles.cardButton}>View product - <span
				className={styles.yellow}>${props.price}</span></Link>
		</div>
	)
}
