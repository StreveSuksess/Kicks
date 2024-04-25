import styles from './Product.module.scss'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { productsApi } from '../../services/productsApi.ts'
import { Loading } from '../Loading/Loading.tsx'
import { useActions } from '../../hooks/useActions.ts'
import Slider from 'react-slick'
import { Carousel } from '../Carousel/Carousel.tsx'

export const Product = () => {
	const [showError, setShowError] = useState(false)
	const [added, setAdded] = useState(false)
	const [addAnim, setAddAnim] = useState(false)
	const navigate = useNavigate()
	const { addToCart, setBuyNowItem } = useActions()
	const { register, watch } = useForm()
	const { productId } = useParams()
	const { data: item, isLoading } = productsApi.useFetchProductQuery(Number(productId))

	const carouselSettings = {
		dots: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
	}

	let slider: Slider | null

	useEffect(() => {
		if (window.innerWidth >= 768) window.scrollTo(0, 100)
		else window.scrollTo(0, 0)
		setAdded(false)
	}, [productId])

	if (isLoading) return <Loading />
	else if (item) {
		return (
			<div className={styles.product + ' container'}>
				<div className={styles.main}>
					<div className={styles.images}>
						<img src={item.allImages[0]} alt='' className={styles.firstImage} />
						<img src={item.allImages[1]} alt='' className={styles.secondImage} />
						<img src={item.allImages[2]} alt='' className={styles.thirdImage} />
						<img src={item.allImages[3]} alt='' className={styles.fourthImage} />
					</div>
					<div className={styles.mobileImages}>
						<Slider ref={c => slider = c} {...carouselSettings} className='productCarousel'>
							{item.allImages.slice(0, 4).map((image, index) => <img key={index} src={image} alt=''
																																		 className={styles.carouselImage} />)}
						</Slider>
						<div className={styles.bottomImages}>
							{item.allImages.slice(0, 4).map((image, index) => <img key={index} src={image}
																																		 onClick={() => slider?.slickGoTo(index)} alt=''
																																		 className={styles.carouselBottomImage} />)}
						</div>
					</div>
					<div className={styles.text}>
						<h1 className={styles.title}>{item.name}</h1>
						<p className={styles.price}>${item.price}</p>
						<div className={styles.group}>
							<h5 className={styles.groupTitle}>color</h5>
							<div className={styles.color}>
								<div className={styles[item.color]}></div>
							</div>
						</div>
						<div className={styles.group}>
							<h5 className={styles.groupTitle}>size</h5>
							<div className={styles.sizes}>
								{[38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(size =>
									<label className={styles.sizeRadio} key={size}>
										<input disabled={!item.sizes.includes(size)} type='radio' value={size} id=''
													 {...register('size')} />
										<div><span>{size}</span></div>
									</label>
								)
								}
							</div>
							{showError && !watch().size && <p className={styles.error}>⚠ Please select a size</p>}
						</div>
						<div className={styles.buttons}>
							<button onClick={() => {
								if (watch().size) {
									addToCart({
										previewImage: item.previewImage,
										id: item.id,
										name: item.name,
										price: item.price,
										size: watch().size,
										color: item.color,
										shoesType: item.shoesType,
										gender: item.gender
									})
									setAdded(true)
									setAddAnim(true)
									setTimeout(() => setAddAnim(false), 300)
								} else setShowError(true)
							}} className={addAnim ? styles.add + ' ' + styles.addAnim : styles.add}>
								{added ? 'added' : 'add to card'}
							</button>
							<button onClick={() => {
								if (watch().size) {
									setBuyNowItem({ ...item, quantity: 1, size: watch().size })
									navigate('/Kicks/checkout/buyNow')
								} else setShowError(true)
							}} className={styles.buy}>buy it now
							</button>
						</div>
						<div className={styles.about}>
							<h5 className={styles.aboutTitle}>about the product</h5>
							<p className={styles.description}>{item.description}</p>
						</div>
					</div>
				</div>
				<Carousel />
			</div>
		)
	}
}
