import { Dispatch, FC, SetStateAction } from 'react'
import styles from '../Listing.module.scss'

type Props = {
	itemsLength: number,
	paginationValue: number,
	page: number,
	setPage: Dispatch<SetStateAction<number>>
}

export const Pagination: FC<Props> = (props) => {
	if (props.itemsLength) {
		return (
			<div className={styles.pagination}>
				<button onClick={() => {
					if (props.page === 1) return
					props.setPage(page => page - 1)
					window.scrollTo(0, 150)
				}}>
					<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
						<path d='M10.5 12.5L6 8L10.5 3.5' stroke='#232321' />
					</svg>
					<span>previous</span>
				</button>
				{
					Math.ceil(props.itemsLength / props.paginationValue) > 4 ?
						props.page <= 4
							?
							<>
								{
									window.innerWidth > 768 ?
										<>
											<button className={props.page === 1 ? styles.active : ''}
															onClick={() => {
																props.setPage(1)
																window.scrollTo(0, 150)
															}}>{1}</button>
											<button className={props.page === 2 ? styles.active : ''}
															onClick={() => {
																props.setPage(2)
																window.scrollTo(0, 150)
															}}>{2}</button>
											<button className={props.page === 3 ? styles.active + ' ' + styles.button3 : styles.button3}
															onClick={() => {
																props.setPage(3)
																window.scrollTo(0, 150)
															}}>{3}</button>
											<button className={props.page === 4 ? styles.active + ' ' + styles.button4 : styles.button4}
															onClick={() => {
																props.setPage(4)
																window.scrollTo(0, 150)
															}}>{4}</button>
										</>
										:
										<>
											{
												props.page >= Math.ceil(props.itemsLength / props.paginationValue) - 2 ?
													<>
														<button
															className={Math.ceil(props.itemsLength / props.paginationValue) - 2 == props.page ? styles.active : ''}
															onClick={() => {
																props.setPage(Math.ceil(props.itemsLength / props.paginationValue) - 2)
																window.scrollTo(0, 150)
															}}>{Math.ceil(props.itemsLength / props.paginationValue) - 2}</button>
														<button
															className={Math.ceil(props.itemsLength / props.paginationValue) - 1 == props.page ? styles.active : ''}
															onClick={() => {
																props.setPage(Math.ceil(props.itemsLength / props.paginationValue) - 1)
																window.scrollTo(0, 150)
															}}>{Math.ceil(props.itemsLength / props.paginationValue) - 1}</button>
														<button
															className={Math.ceil(props.itemsLength / props.paginationValue) == props.page ? styles.active : ''}
															onClick={() => {
																props.setPage(Math.ceil(props.itemsLength / props.paginationValue))
																window.scrollTo(0, 150)
															}}>{Math.ceil(props.itemsLength / props.paginationValue)}</button>
													</>
													:
													<>
														<button className={styles.active}
																		onClick={() => {
																			props.setPage(props.page)
																			window.scrollTo(0, 150)
																		}}>{props.page}</button>
														<button
															onClick={() => {
																props.setPage(page => page + 1)
																window.scrollTo(0, 150)
															}}>{props.page + 1}</button>
													</>
											}
										</>
								}
							</>
							:
							<>
								<button className={styles.button3} onClick={() => {
									props.setPage(props.page - 3)
									window.scrollTo(0, 150)
								}}>{props.page - 3}</button>
								<button className={styles.button4} onClick={() => {
									props.setPage(props.page - 2)
									window.scrollTo(0, 150)
								}}>{props.page - 2}</button>
								<button onClick={() => {
									props.setPage(props.page - 1)
									window.scrollTo(0, 150)
								}}>{props.page - 1}</button>
								<p className={styles.active}>{props.page}</p>
							</>
						:
						<>
							<button
								onClick={() => {
									props.setPage(1)
									window.scrollTo(0, 150)
								}}
								className={props.page === 1 ? styles.active : ''}>1
							</button>
							<button
								onClick={() => {
									props.setPage(2)
									window.scrollTo(0, 150)
								}}
								className={Math.ceil(props.itemsLength / props.paginationValue) < 2 ? styles.dn : props.page === 2 ? styles.active : ''}>2
							</button>
							<button
								onClick={() => {
									props.setPage(3)
									window.scrollTo(0, 150)
								}}
								className={Math.ceil(props.itemsLength / props.paginationValue) < 3 ? styles.dn : props.page === 3 ? styles.active : styles.button3}>3
							</button>
							<button
								onClick={() => {
									props.setPage(4)
									window.scrollTo(0, 150)
								}}
								className={Math.ceil(props.itemsLength / props.paginationValue) < 4 ? styles.dn : props.page === 4 ? styles.active : styles.button4}>4
							</button>
						</>
				}
				{
					window.innerWidth > 768 ?
						Math.ceil(props.itemsLength / props.paginationValue) > 4 &&
						props.page != Math.ceil(props.itemsLength / props.paginationValue) &&
						<>
							<span>...</span>
							<button
								onClick={() => {
									props.setPage(Math.ceil(props.itemsLength / props.paginationValue))
									window.scrollTo(0, 150)
								}}>{Math.ceil(props.itemsLength / props.paginationValue)}</button>
						</>
						:
						props.page < Math.ceil(props.itemsLength / props.paginationValue) - 2 &&
						<>
							<span>...</span>
							<button
								onClick={() => {
									props.setPage(Math.ceil(props.itemsLength / props.paginationValue))
									window.scrollTo(0, 150)
								}}>{Math.ceil(props.itemsLength / props.paginationValue)}</button>
						</>
				}
				<button onClick={() => {
					if (props.page === Math.ceil(props.itemsLength / props.paginationValue)) return
					props.setPage(page => page + 1)
					window.scrollTo(0, 150)
				}}>
					<span>next</span>
					<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
						<path d='M6 3.5L10.5 8L6 12.5' stroke='#232321' />
					</svg>
				</button>
			</div>
		)
	}
}
