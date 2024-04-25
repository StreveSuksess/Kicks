import { FC, useEffect, useState } from 'react'
import styles from './Slider.module.scss'
import sliderImage1 from '../../../assets/sliderImages/1.jpg'
import sliderImage2 from '../../../assets/sliderImages/2.jpg'
import sliderImage3 from '../../../assets/sliderImages/3.jpg'
import { Link } from 'react-router-dom'

export const Slider: FC = () => {
	const [fade, setFade] = useState(false)
	const [slide, setSlide] = useState(1)

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(true)
			setTimeout(() => {
				setSlide(slide => slide + 1 > 3 ? 1 : slide + 1)
				setFade(false)
			}, 500)
		}, 5000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className={styles.slider}>
			<span className={styles.leftText}>Nike product of the year</span>
			<div className={styles.content}>
				<h2 className={styles.sliderTitle}>NIKE AIR MAX</h2>
				<p className={styles.sliderDescription}>Nike introducing the new air max for everyone's comfort</p>
				<Link to='/Kicks/listing' className={styles.sliderButton}>SHOP NOW</Link>
			</div>
			<img src={slide === 1 ? sliderImage1 : slide === 2 ? sliderImage2 : sliderImage3} alt=''
					 className={fade ? styles.fade + ' ' + styles.mainImg : styles.mainImg} />
			<div className={fade ? styles.fade + ' ' + styles.inactiveSlides : styles.inactiveSlides}>
				<img src={slide === 1 ? sliderImage2 : slide === 2 ? sliderImage1 : sliderImage2} alt='' />
				<img src={slide === 1 ? sliderImage3 : slide === 2 ? sliderImage3 : sliderImage1} alt='' />
			</div>
		</div>
	)
}