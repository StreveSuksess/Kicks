import { FC, useState } from 'react'
import styles from './Carousel.module.scss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slider from 'react-slick'
import { Item } from '../Item/Item.tsx'
import { productsApi } from '../../services/productsApi.ts'
import { Loading } from '../Loading/Loading.tsx'

export const Carousel: FC = () => {
	const [disableNextButton, setDisableNextButton] = useState(false)
	const [disablePrevButton, setDisablePrevButton] = useState(true)
	const { data: items, isLoading } = productsApi.useFetchProductsQuery(window.innerWidth > 1020 ? 16 : 8)

	const settings = {
		infinite: false,
		dots: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		responsive: [
			{
				breakpoint: 1340,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 1020,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	}

	let slider: Slider | null

	if (isLoading) return <Loading />
	return (
		<div className={styles.carousel + ' carousel'}>
			<div className={styles.header}>
				<h2 className={styles.title}>You may also like</h2>
				<div className={styles.arrows}>
					<button disabled={disablePrevButton} className={styles.leftArrow} onClick={() => {
						setDisableNextButton(false)
						slider?.slickPrev()
						// @ts-ignore
						if (slider?.innerSlider?.state?.targetSlide <= 4 && window.innerWidth > 1020) setDisablePrevButton(true)
						// @ts-ignore
						else if (slider?.innerSlider?.state?.targetSlide <= 2) setDisablePrevButton(true)
					}}>
						<svg xmlns='http://www.w3.org/2000/svg' width='16' height='17' viewBox='0 0 16 17' fill='none'>
							<path d='M10 13L5.5 8.5L10 4' stroke='white' />
						</svg>
					</button>
					<button disabled={disableNextButton} className={styles.rightArrow} onClick={() => {
						setDisablePrevButton(false)
						slider?.slickNext()
						// @ts-ignore
						if (slider?.innerSlider?.state?.currentSlide === (slider?.innerSlider?.state?.slideCount - 8) && window.innerWidth > 1020) setDisableNextButton(true)
						// @ts-ignore
						else if (slider?.innerSlider?.state?.currentSlide === (slider?.innerSlider?.state?.slideCount - 4)) setDisableNextButton(true)
					}}>
						<svg xmlns='http://www.w3.org/2000/svg' width='16' height='17' viewBox='0 0 16 17' fill='none'>
							<path d='M6 4L10.5 8.5L6 13' stroke='white' />
						</svg>
					</button>
				</div>
			</div>
			<Slider ref={c => slider = c} {...settings}>
				{items?.map(item => {
					const nameLength = window.innerWidth > 768 ? 20 : 14
					return <div className={styles.slide} key={item.id}><Item {...item}
																																	 name={item.name.length > nameLength ? item.name.slice(0, nameLength) + '...' : item.name}
					/>
					</div>
				})}
			</Slider>
		</div>
	)
}