import { FC } from 'react'
import styles from './Footer.module.scss'
import topLogo from './../../assets/footerTopLogo.svg'
import bottomLogo from './../../assets/footerBottomLogo.svg'
import { Link } from 'react-router-dom'

export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.top}>
				<div className={styles.col}>
					<h3 className={styles.title}>Join our KicksPlus Club & get 15% off</h3>
					<p className={styles.p}>Sign up for free! Join the community.</p>
					<div className={styles.form}>
						<input autoFocus={false} type='text' placeholder='Email address' />
						<Link to='/Kicks/register'>Submit</Link>
					</div>
				</div>
				<div className={styles.col + ' ' + styles.colRight}>
					<img src={topLogo} alt='' />
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.mainComponent}>
					<h3>About me</h3>
					<p>I am a software developer, Stanislav Gavrilin.</p>
				</div>
				<div className={styles.component}>
					<h3>Categories</h3>
					<ul>
						<li><Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/runners'>Runners</Link></li>
						<li><Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/football'>Football</Link></li>
						<li><Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/hiking'>Hiking</Link></li>
						<li><Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/sneakers'>Sneakers</Link></li>
						<li><Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/basketball'>Basketball</Link></li>
						<li><Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/golf'>Golf</Link></li>
						<li><Link onClick={() => window.scrollTo(0, 150)} to='/Kicks/listing/soccer'>Soccer</Link></li>
					</ul>
				</div>
				<div className={styles.component}>
					<h3>Company</h3>
					<ul>
						<li><a href='https://t.me/strevesuksess'>About</a></li>
						<li><a href='https://t.me/strevesuksess'>Contact</a></li>
						<li><a href='https://t.me/strevesuksess'>Blogs</a></li>
					</ul>
				</div>
				<div className={styles.component}>
					<h3>Follow me </h3>
					<div className={styles.follow}>
						<a href='https://t.me/strevesuksess'>
							<svg xmlns='http://www.w3.org/2000/svg' width='30px' height='30px' viewBox='0 0 100 100'>
								<path
									fill='#fff'
									d='M88.723,12.142C76.419,17.238,23.661,39.091,9.084,45.047c-9.776,3.815-4.053,7.392-4.053,7.392    s8.345,2.861,15.499,5.007c7.153,2.146,10.968-0.238,10.968-0.238l33.62-22.652c11.922-8.107,9.061-1.431,6.199,1.431    c-6.199,6.2-16.452,15.975-25.036,23.844c-3.815,3.338-1.908,6.199-0.238,7.63c6.199,5.246,23.129,15.976,24.082,16.691    c5.037,3.566,14.945,8.699,16.452-2.146c0,0,5.961-37.435,5.961-37.435c1.908-12.637,3.815-24.321,4.053-27.659    C97.307,8.804,88.723,12.142,88.723,12.142z' />
							</svg>
						</a>
					</div>
				</div>
				<img src={bottomLogo} alt='' className={styles.bottomLogo} />
			</div>
		</footer>
	)
}