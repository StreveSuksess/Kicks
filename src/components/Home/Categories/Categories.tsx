import { FC, useState } from 'react'
import styles from './Categories.module.scss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

export const Categories: FC = () => {
	const [disableNextButton, setDisableNextButton] = useState(false)
	const [disablePrevButton, setDisablePrevButton] = useState(true)

	const settings = {
		infinite: false,
		dots: false,
		speed: 300,
		slidesToShow: 2,
		slidesToScroll: 1,
		variableWidth: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 1340,
				settings: {
					slidesToShow: 1
				}
			}
		]
	}

	let slider: Slider | null

	return (
		<div className={styles.categories + ' categories'}>
			<div className={styles.header}>
				<h2 className={styles.title}>Categories</h2>
				<div className={styles.arrows}>
					<button disabled={disablePrevButton} className={styles.leftArrow} onClick={() => {
						setDisableNextButton(false)
						slider?.slickPrev()
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						if (slider?.innerSlider?.state?.targetSlide <= 1) setDisablePrevButton(true)
					}}>
						<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
							<path d='M10 12.5L5.5 8L10 3.5' stroke='#232321' />
						</svg>
					</button>
					<button disabled={disableNextButton} className={styles.rightArrow} onClick={() => {
						setDisablePrevButton(false)
						slider?.slickNext()
						// @ts-ignore
						if (slider?.innerSlider?.state?.currentSlide === (slider?.innerSlider?.state?.slideCount - 3) && window.innerWidth > 768) setDisableNextButton(true)
						// @ts-ignore
						else if (slider?.innerSlider?.state?.currentSlide === (slider?.innerSlider?.state?.slideCount - 2)) setDisableNextButton(true)
					}}>
						<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
							<path d='M6 3.5L10.5 8L6 12.5' stroke='#232321' />
						</svg>
					</button>
				</div>
			</div>
			<Slider ref={c => slider = c} {...settings}>
				<div>
				</div>
				<div className={styles.slide}>
					<img
						src='https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/401247c028f9435c85eeacd401255b9f_9366/Duramo_SL_Running_Shoes_Black_G58108_01_standard.jpg'
						alt='' className={styles.categoryImage} />
					<div className={styles.categoryContent}>
						<h3 className={styles.categoryTitle}>Runner Shoes</h3>
						<Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/runners' className={styles.categoryLink}>
							{
								window.innerWidth > 768 ?
									<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
										<path d='M10.1668 9.10565H22.8947V21.8336M22.0108 9.98954L9.10615 22.8942' stroke='#E7E7E3' />
									</svg>
									:
									<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
										<path d='M5.0834 4.55283H11.4474V10.9168M11.0054 4.99477L4.55307 11.4471' stroke='#E7E7E3' />
									</svg>
							}
						</Link>
					</div>
				</div>
				<div className={styles.slide}>
					<img
						src='https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b9ed1ab6b84d4efbbbe0e8d01223c704_9366/NMD_G1_Shoes_White_IE4569_01_standard.jpg'
						alt='' className={styles.categoryImage} />
					<div className={styles.categoryContent}>
						<h3 className={styles.categoryTitle}>Sneakers Shoes</h3>
						<Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/sneakers' className={styles.categoryLink}>
							{
								window.innerWidth > 768 ?
									<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
										<path d='M10.1668 9.10565H22.8947V21.8336M22.0108 9.98954L9.10615 22.8942' stroke='#E7E7E3' />
									</svg>
									:
									<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
										<path d='M5.0834 4.55283H11.4474V10.9168M11.0054 4.99477L4.55307 11.4471' stroke='#E7E7E3' />
									</svg>
							}
						</Link>
					</div>
				</div>
				<div className={styles.slide}>
					<img
						src='https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5c102fd2e8f141319e59b5523cad4054_9366/Trae_Young_3_Shoes_Turquoise_IF5603_01_standard.jpg'
						alt='' className={styles.categoryImage} />
					<div className={styles.categoryContent}>
						<h3 className={styles.categoryTitle}>Basketball Shoes</h3>
						<Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/basketball'
									className={styles.categoryLink}>
							{
								window.innerWidth > 768 ?
									<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
										<path d='M10.1668 9.10565H22.8947V21.8336M22.0108 9.98954L9.10615 22.8942' stroke='#E7E7E3' />
									</svg>
									:
									<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
										<path d='M5.0834 4.55283H11.4474V10.9168M11.0054 4.99477L4.55307 11.4471' stroke='#E7E7E3' />
									</svg>
							}
						</Link>
					</div>
				</div>
				<div className={styles.slide}>
					<img
						src='https://assets.adidas.com/images/w_320,f_auto,q_auto,fl_lossy,c_fill,g_auto/2d2cf4a0199e46358bbdaf9f0018a883_9366/mc80-spikeless-golf-shoes.jpg'
						alt='' className={styles.categoryImage} />
					<div className={styles.categoryContent}>
						<h3 className={styles.categoryTitle}>Golf Shoes</h3>
						<Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/golf' className={styles.categoryLink}>
							{
								window.innerWidth > 768 ?
									<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
										<path d='M10.1668 9.10565H22.8947V21.8336M22.0108 9.98954L9.10615 22.8942' stroke='#E7E7E3' />
									</svg>
									:
									<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
										<path d='M5.0834 4.55283H11.4474V10.9168M11.0054 4.99477L4.55307 11.4471' stroke='#E7E7E3' />
									</svg>
							}
						</Link>
					</div>
				</div>
				<div className={styles.slide}>
					<img
						src='https://assets.adidas.com/images/w_320,f_auto,q_auto,fl_lossy,c_fill,g_auto/f401a572faa74edfb717af1c0002bab0_9366/freak-ultra-23-inline-cleats.jpg'
						alt='' className={styles.categoryImage} />
					<div className={styles.categoryContent}>
						<h3 className={styles.categoryTitle}>Football Shoes</h3>
						<Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/football' className={styles.categoryLink}>
							{
								window.innerWidth > 768 ?
									<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
										<path d='M10.1668 9.10565H22.8947V21.8336M22.0108 9.98954L9.10615 22.8942' stroke='#E7E7E3' />
									</svg>
									:
									<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
										<path d='M5.0834 4.55283H11.4474V10.9168M11.0054 4.99477L4.55307 11.4471' stroke='#E7E7E3' />
									</svg>
							}
						</Link>
					</div>
				</div>
				<div className={styles.slide}>
					<img
						src='https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/eb7994574c5f486fb525a50be05f1f6d_9366/TERREX_AX4_Hiking_Shoes_Black_IF4867_01_standard.jpg'
						alt='' className={styles.categoryImage} />
					<div className={styles.categoryContent}>
						<h3 className={styles.categoryTitle}>Hiking Shoes</h3>
						<Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/hiking' className={styles.categoryLink}>
							{
								window.innerWidth > 768 ?
									<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
										<path d='M10.1668 9.10565H22.8947V21.8336M22.0108 9.98954L9.10615 22.8942' stroke='#E7E7E3' />
									</svg>
									:
									<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
										<path d='M5.0834 4.55283H11.4474V10.9168M11.0054 4.99477L4.55307 11.4471' stroke='#E7E7E3' />
									</svg>
							}
						</Link>
					</div>
				</div>
			</Slider>
		</div>
	)
}