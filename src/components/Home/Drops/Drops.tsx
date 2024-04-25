import { FC } from 'react'
import styles from './Drops.module.scss'
import { Item } from '../../Item/Item.tsx'
import { item } from '../../../interfaces/items.ts'
import { Link } from 'react-router-dom'
import { productsApi } from '../../../services/productsApi.ts'
import { Loading } from '../../Loading/Loading.tsx'


export const Drops: FC = () => {
	const { data: items, isLoading } = productsApi.useFetchProductsQuery(4)
	if (isLoading) return <Loading />
	return (
		<div className={styles.drops}>
			<div className={styles.header}>
				<h2 className={styles.title}>Don’t miss out new drops</h2>
				<Link to='/Kicks/listing' className={styles.headerButton}>Shop new drops</Link>
			</div>
			<div className={styles.grid}>
				{items && items.map((item: item) => <Item {...item} key={item.id} new={true} />)}
			</div>
		</div>
	)
}