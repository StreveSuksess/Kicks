import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../services/productsApi.ts'
import { authApi } from '../services/authApi.ts'
import { cartReducer } from './slices/CartSlice.ts'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		cart: cartReducer
	}, middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(productsApi.middleware, authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
