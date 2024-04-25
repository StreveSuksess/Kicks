// noinspection JSUnresolvedReference

import { Dispatch, FC, useEffect, useState } from 'react'
import styles from './Listing.module.scss'
import { Discount } from './Discont/Discount.tsx'
import { item } from '../../interfaces/items.ts'
import { useForm } from 'react-hook-form'
import { productsApi } from '../../services/productsApi.ts'
import { Loading } from '../Loading/Loading.tsx'
import { useParams } from 'react-router'
import { Dropdown } from '../Dropdown/Dropdown.tsx'
import { Accordion } from '../Accordion/Accordion.tsx'
import { Item } from '../Item/Item.tsx'
import { Pagination } from './Pagination/Pagination.tsx'

type TSortBy = 'Price Min' | 'Price Max' | 'trending'
const sortByArr: TSortBy[] = ['Price Min', 'Price Max', 'trending']

export const Listing = () => {
	const params = useParams()
	const { data: items, isLoading } = productsApi.useFetchProductsQuery(100)

	if (isLoading) return <Loading />
	else if (items) return <ListingComponent items={items} filterDefaultValues={params} />
}

type Props = {
	items: item[],
	filterDefaultValues: {
		type?: string,
		gender?: string
	}
}

const ListingComponent: FC<Props> = (props) => {
	const paginationValue: number = window.innerWidth > 720 ? 9 : 8
	const [page, setPage] = useState(1)
	const [filteredItems, setFilteredItems] = useState(props.items)
	const [sortBy, setSortBy]: [TSortBy, Dispatch<any>] = useState('trending')
	const { register, watch, reset } = useForm()
	const [showFilter, setShowFilter] = useState(window.innerWidth > 920)
	const [filterAnim, setFilterAnim] = useState(false)

	const maxPrice = Math.max(...filteredItems.map((item: item) => item.price))

	useEffect(() => {
		const newFilteredItems: item[] = props.items.filter((item: item) => {
			let result = true
			if (props.filterDefaultValues?.type) {
				if (item.shoesType !== props.filterDefaultValues?.type.toUpperCase()[0] + props?.filterDefaultValues?.type.slice(1)) result = false
			}
			if (props.filterDefaultValues?.gender) {
				if (item.gender !== props.filterDefaultValues?.gender.toUpperCase()[0] + props.filterDefaultValues?.gender.slice(1)) result = false
			}
			return result
		})
		setFilteredItems(newFilteredItems)
	}, [])

	useEffect(() => {
		const subscription = watch((data) => {
			setPage(1)
			const newFilteredItems: item[] = props.items.filter((item: item) => {
				let result = true
				if (data?.sizes?.length) {
					let countSize: number = 0
					item.sizes.forEach((size: number) => {
						if (data.sizes.includes(size.toString())) countSize += 1
					})
					result = countSize > 0
				}
				if (data?.colors?.length) {
					if (!data.colors.includes(item.color)) result = false
				}
				if (data?.shoes?.length) {
					if (!data.shoes.includes(item.shoesType)) result = false
				}
				if (data?.gender?.length) {
					if (!data.gender.includes(item.gender)) result = false
				}
				if (data.price > item.price) return false
				return result
			})
			setFilteredItems(newFilteredItems)
		}, [])

		return () => {
			subscription.unsubscribe()
		}
	}, [watch])

	return (
		<div className={styles.listing + ' container'}>
			<Discount />
			<div className={styles.header} id='header'>
				<div className={styles.mobileButtons}>
					<button onClick={() => setShowFilter(true)} className={styles.filterButton}>
						<span>Filters</span>
						<svg width='16' height='17' viewBox='0 0 16 17'>
							<path
								d='M7.33333 12.5C7.14444 12.5 6.98622 12.436 6.85867 12.308C6.73067 12.1804 6.66667 12.0222 6.66667 11.8333C6.66667 11.6444 6.73067 11.4862 6.85867 11.3587C6.98622 11.2307 7.14444 11.1667 7.33333 11.1667H8.66667C8.85556 11.1667 9.014 11.2307 9.142 11.3587C9.26956 11.4862 9.33333 11.6444 9.33333 11.8333C9.33333 12.0222 9.26956 12.1804 9.142 12.308C9.014 12.436 8.85556 12.5 8.66667 12.5H7.33333ZM2.66667 5.83333C2.47778 5.83333 2.31956 5.76956 2.192 5.642C2.064 5.514 2 5.35556 2 5.16667C2 4.97778 2.064 4.81933 2.192 4.69133C2.31956 4.56378 2.47778 4.5 2.66667 4.5H13.3333C13.5222 4.5 13.6804 4.56378 13.808 4.69133C13.936 4.81933 14 4.97778 14 5.16667C14 5.35556 13.936 5.514 13.808 5.642C13.6804 5.76956 13.5222 5.83333 13.3333 5.83333H2.66667ZM4.66667 9.16667C4.47778 9.16667 4.31933 9.10267 4.19133 8.97467C4.06378 8.84711 4 8.68889 4 8.5C4 8.31111 4.06378 8.15267 4.19133 8.02467C4.31933 7.89711 4.47778 7.83333 4.66667 7.83333H11.3333C11.5222 7.83333 11.6804 7.89711 11.808 8.02467C11.936 8.15267 12 8.31111 12 8.5C12 8.68889 11.936 8.84711 11.808 8.97467C11.6804 9.10267 11.5222 9.16667 11.3333 9.16667H4.66667Z'
								fill='black' />
						</svg>
						{
							filteredItems.length !== props.items.length &&
							<div className={styles.filterCircle}></div>
						}
					</button>
					<Dropdown value={sortBy} setValue={setSortBy} valuesArr={sortByArr} />
				</div>
				<div className={styles.text}>
					<h2 className={styles.title}>Life Style Shoes</h2>
					<span className={styles.subText}>{props.items.length} items</span>
				</div>
				{
					window.innerWidth > 920 && <Dropdown value={sortBy} setValue={setSortBy} valuesArr={sortByArr} />
				}
			</div>
			<div className={styles.content}>
				<form className={`${styles.filter} ${showFilter && styles.show} ${filterAnim && styles.filterAnim}`}>
					<div className={styles.mobileFilterHeader}>
						<h3>Filters</h3>
						<svg onClick={() => {
							setFilterAnim(true)
							setTimeout(() => {
								setShowFilter(false)
								setFilterAnim(false)
							}, 500)
						}} width='24' height='24' viewBox='0 0 24 24'>
							<path
								d='M6.75781 17.2428L12.0008 11.9998M17.2438 6.75684L11.9998 11.9998M11.9998 11.9998L6.75781 6.75684M12.0008 11.9998L17.2438 17.2428'
								stroke='black'
								strokeWidth='1.5'
								strokeLinecap='round'
							/>
						</svg>
					</div>
					<h3 className={styles.filterTitle}>Filters</h3>
					<Accordion title='size'>
						<div className={styles.size}>
							{[38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(num =>
								<label className={styles.sizeCheckbox} key={num}>
									<input type='checkbox' value={num} id=''
												 {...register('sizes')} />
									<div><span>{num}</span></div>
								</label>
							)
							}
						</div>
					</Accordion>
					<Accordion title='colors'>
						<div className={styles.colors}>
							{['blue', 'yellow', 'black', 'green', 'darkgray', 'orange', 'white', 'lightgray', 'brown', 'lightbrown'].map(color =>
								<label className={styles.colorRadio} key={color}>
									<input type='checkbox' id='' value={color} {...register('colors')} />
									<div className={styles[color]}></div>
								</label>
							)
							}
						</div>
					</Accordion>
					<Accordion title='shoes'>
						<div className={styles.defaultCheckboxes}>
							{['Football', 'Runners', 'Hiking', 'Sneakers', 'Basketball', 'Golf', 'Soccer'].map(type =>
								<label className={styles.defaultCheckbox} key={type}>
									<input type='checkbox' id=''
												 value={type} {...register('shoes', { value: props.filterDefaultValues?.type ? props.filterDefaultValues?.type.toUpperCase()[0] + props.filterDefaultValues?.type.slice(1) : '' })} />
									<div><span></span></div>
									<span>{type}</span>
								</label>
							)
							}
						</div>
					</Accordion>
					<Accordion title='gender'>
						<div className={styles.defaultCheckboxes}>
							{['Men', 'Women'].map(gender =>
								<label className={styles.defaultCheckbox} key={gender}>
									<input type='checkbox' id=''
												 value={gender} {...register('gender', { value: props.filterDefaultValues?.gender ? props.filterDefaultValues?.gender.toUpperCase()[0] + props.filterDefaultValues?.gender.slice(1) : '' })} />
									<div><span></span></div>
									<span>{gender}</span>
								</label>
							)
							}
						</div>
					</Accordion>
					<Accordion title='price'>
						<div className={styles.range}>
							<input type='range' min='0' max={maxPrice} {...register('price', { value: 0 })} />
							<span className={styles.maxPrice}>{maxPrice}$</span>
							<span style={{ left: `calc((100%/${maxPrice}*${watch().price - 7}))` }}
										className={styles.currentPrice}>{watch().price}$</span>
						</div>
					</Accordion>
					<div className={styles.mobileFilterButtons}>
						<div onClick={() => reset()} className={styles.resetButton}>Reset</div>
						<div onClick={() => {
							setFilterAnim(true)
							setTimeout(() => {
								setShowFilter(false)
								setFilterAnim(false)
							}, 500)
						}} className={styles.applyButton}>Apply
						</div>
					</div>
				</form>
				<div className={styles.rightCol}>
					<div className={styles.items}>
						{[...filteredItems].sort((a, b) => {
							if (sortBy === 'trending') return a.id - b.id
							else if (sortBy === 'Price Max') return b.price - a.price
							else if (sortBy === 'Price Min') return a.price - b.price
							else return 0
						})
							.slice((page - 1) * paginationValue, page * paginationValue)
							.map((item: item) => <Item {...item} key={item.id} />)}
					</div>
					{filteredItems.length > paginationValue &&
						<Pagination itemsLength={filteredItems.length} page={page} setPage={setPage}
												paginationValue={paginationValue} />}
				</div>
			</div>
		</div>
	)
}
