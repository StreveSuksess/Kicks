import { Dispatch, FC, SetStateAction, useState } from 'react'
import logo from '../../assets/logo.svg'
import search from '../../assets/search.svg'
import user from '../../assets/user.svg'
import cart from '../../assets/cart.svg'
import styles from './Navigation.module.scss'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppSelector.ts'

export const Navigation: FC = () => {
	const cartItemsLength = useAppSelector((state) => state.cart.items).reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0)
	const [menShow, setMenShow] = useState(false)
	const [womenShow, setWomenShow] = useState(false)
	const [mobileMenuShow, setMobileMenuShow] = useState(false)
	const [mobileMenuAnim, setMobileMenuAnim] = useState(false)
	const [menMenuShow, setMenMenuShow] = useState(false)
	const [menMenuAnim, setMenMenuAnim] = useState(false)
	const [womenMenuShow, setWomenMenuShow] = useState(false)
	const [womenMenuAnim, setWomenMenuAnim] = useState(false)

	const closeAnim = (animFunction: Dispatch<SetStateAction<boolean>>, closeFunction: Dispatch<SetStateAction<boolean>>) => {
		animFunction(true)
		setTimeout(() => {
			closeFunction(false)
			animFunction(false)
		}, 500)
	}

	return (
		<header className={styles.navigation}>
			<ul className={styles.ul}>
				<button onClick={() => setMobileMenuShow(true)} className={styles.burger} />
				<li className={menShow ? styles.transformAfter + ' ' + styles.navDrop : styles.navDrop} onClick={() => {
					setWomenShow(false)
					setMenShow(prevValue => !prevValue)
				}}>Men
				</li>
				<div className={menShow ? styles.show + ' ' + styles.menDropDown : styles.menDropDown}>
					{['Football', 'Runners', 'Hiking', 'Sneakers', 'Basketball', 'Golf', 'Soccer'].map(value => <Link
						hidden={!menShow} onClick={() => setMenShow(false)}
						to={`/Kicks/listing/${value}/men`}
						key={value}>{value}</Link>)}
				</div>
				<li className={womenShow ? styles.transformAfter + ' ' + styles.navDrop : styles.navDrop} onClick={() => {
					setMenShow(false)
					setWomenShow(prevValue => !prevValue)
				}}>Women
				</li>
				<div className={womenShow ? styles.show + ' ' + styles.womenDropDown : styles.womenDropDown}>
					{['Runners', 'Hiking', 'Sneakers', 'Basketball', 'Golf', 'Soccer'].map(value => <Link hidden={!womenShow}
																																																onClick={() => setWomenShow(false)}
																																																to={`/Kicks/listing/${value}/women`}
																																																key={value}>{value}</Link>)}
				</div>
			</ul>
			<Link className={styles.logoLink} to={'/Kicks/'}><img src={logo} alt='' className={styles.logo} /></Link>
			<ul className={styles.ul}>
				<li><Link to={'/Kicks/listing'} className={styles.navLink + ' ' + styles.navLinkSearch}><img src={search}
																																																		 alt='' /></Link>
				</li>
				<li className={styles.navLiProfile}><Link to={'/Kicks/profile'}
																									className={styles.navLink}><img
					src={user}
					alt='' /></Link></li>
				<li><Link to={'/Kicks/cart'} className={styles.navLink + ' ' + styles.navLinkCart}>
					<img src={cart} alt='' />
					<span
						className={cartItemsLength === 0 ? styles.cartItemsCount : styles.cartItemsCount + ' ' + styles.show}>{cartItemsLength}</span>
				</Link></li>
			</ul>
			{
				mobileMenuShow &&
				<div className={mobileMenuAnim ? styles.mobileMenu + ' ' + styles.menuAnim : styles.mobileMenu}>
					<div className={styles.mobileMenuHeader}>
						<h3>Navigation</h3>
						<svg onClick={() => {
							closeAnim(setMobileMenuAnim, setMobileMenuShow)
						}} width='24' height='24' viewBox='0 0 24 24'>
							<path
								d='M6.75781 17.2428L12.0008 11.9998M17.2438 6.75684L11.9998 11.9998M11.9998 11.9998L6.75781 6.75684M12.0008 11.9998L17.2438 17.2428'
								stroke='black'
								strokeWidth='1.5'
								strokeLinecap='round'
							/>
						</svg>
					</div>
					<div className={styles.mobileNavigation}>
						<button onClick={() => setMenMenuShow(true)}>
							<span>Men</span>
							<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 16 16'>
								<path d='M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125' fill='#E7E7E3' stroke='black' strokeWidth='1.5'
											strokeLinecap='round' strokeLinejoin='round' />
							</svg>
						</button>
						<button onClick={() => setWomenMenuShow(true)}>
							<span>Women</span>
							<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 16 16'>
								<path d='M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125' fill='#E7E7E3' stroke='black' strokeWidth='1.5'
											strokeLinecap='round' strokeLinejoin='round' />
							</svg>
						</button>
						<Link onClick={() => closeAnim(setMobileMenuAnim, setMobileMenuShow)} to='/Kicks/'>Home</Link>
						<Link onClick={() => closeAnim(setMobileMenuAnim, setMobileMenuShow)} to='/Kicks/profile'>Profile</Link>
						<Link onClick={() => closeAnim(setMobileMenuAnim, setMobileMenuShow)} to='/Kicks/listing'>Listing</Link>
						<Link onClick={() => closeAnim(setMobileMenuAnim, setMobileMenuShow)} to='/Kicks/cart'>Cart</Link>
					</div>
					{
						menMenuShow &&
						<div className={menMenuAnim ? styles.menMenu + ' ' + styles.menuAnim : styles.menMenu}>
							<div className={styles.mobileMenuHeader}>
								<h3>Men</h3>
								<svg onClick={() => {
									closeAnim(setMenMenuAnim, setMenMenuShow)
								}} width='24' height='24' viewBox='0 0 24 24'>
									<path
										d='M6.75781 17.2428L12.0008 11.9998M17.2438 6.75684L11.9998 11.9998M11.9998 11.9998L6.75781 6.75684M12.0008 11.9998L17.2438 17.2428'
										stroke='black'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
							</div>
							<div className={styles.mobileNavigation}>
								{['Football', 'Runners', 'Hiking', 'Sneakers', 'Basketball', 'Golf', 'Soccer'].map(value => <Link
									onClick={() => closeAnim(setMobileMenuAnim, setMobileMenuShow)}
									to={`/Kicks/listing/${value}/men`}
									key={value}>{value}</Link>)}
							</div>
						</div>
					}
					{
						womenMenuShow &&
						<div className={womenMenuAnim ? styles.womenMenu + ' ' + styles.menuAnim : styles.womenMenu}>
							<div className={styles.mobileMenuHeader}>
								<h3>Women</h3>
								<svg onClick={() => {
									closeAnim(setWomenMenuAnim, setWomenMenuShow)
								}} width='24' height='24' viewBox='0 0 24 24'>
									<path
										d='M6.75781 17.2428L12.0008 11.9998M17.2438 6.75684L11.9998 11.9998M11.9998 11.9998L6.75781 6.75684M12.0008 11.9998L17.2438 17.2428'
										stroke='black'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
							</div>
							<div className={styles.mobileNavigation}>
								{['Runners', 'Hiking', 'Sneakers', 'Basketball', 'Golf', 'Soccer'].map(value => <Link
									onClick={() => closeAnim(setMobileMenuAnim, setMobileMenuShow)}
									to={`/Kicks/listing/${value}/women`}
									key={value}>{value}</Link>)}
							</div>
						</div>
					}
				</div>
			}
		</header>
	)
}