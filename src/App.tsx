import { FC } from 'react'
import { Navigation } from './components/Navigation/Navigation.tsx'
import { Home } from './components/Home/Home.tsx'
import { createRoutesFromElements, Outlet, Route } from 'react-router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Listing } from './components/Listing/Listing.tsx'
import { Product } from './components/Product/Product.tsx'
import { Cart } from './components/Cart/Cart.tsx'
import { Register } from './components/Auth/Register/Register.tsx'
import { Login } from './components/Auth/Login/Login.tsx'
import { Profile } from './components/Profile/Profile.tsx'
import { Checkout } from './components/Checkout/Checkout.tsx'
import { Footer } from './components/Footer/Footer.tsx'

const Root = () => {
	return (
		<div>
			<div className='container'>
				<Navigation />
			</div>
			<Outlet />
			<div className='container'>
				<Footer />
			</div>
		</div>
	)
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/Kicks' element={<Root />}>
			<Route index element={<Home />} />
			<Route path='/Kicks/listing/:type?/:gender?' element={<Listing />} />
			<Route path='/Kicks/product/:productId' element={<Product />} />
			<Route path='/Kicks/cart' element={<Cart />} />
			<Route path='/Kicks/register' element={<Register />} />
			<Route path='/Kicks/login' element={<Login />} />
			<Route path='/Kicks/profile' element={<Profile />} />
			<Route path='/Kicks/checkout/:buyNow?' element={<Checkout />} />
		</Route>
	)
)

const App: FC = () => {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	)
}

export default App