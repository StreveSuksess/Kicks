import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItem } from '../../interfaces/ICart.ts'

const LS_KEY_CART = 'cartItems'
const LS_KEY_BUY_NOW_ITEM = 'buyNowItem'

interface ICartItemWithQuantity extends ICartItem {
	quantity: number
}

interface ITasksState {
	items: ICartItemWithQuantity[],
	buyNowItem: ICartItemWithQuantity | null
}

const initialState: ITasksState = {
	items: JSON.parse(localStorage.getItem(LS_KEY_CART) ?? '[]'),
	buyNowItem: JSON.parse(localStorage.getItem(LS_KEY_BUY_NOW_ITEM) ?? 'null')
}

export const CartSlice = createSlice({
	name: 'cartItems',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICartItem>) => {
			if (state.items.map(cartItem => cartItem.id).includes(action.payload.id) && state.items.map(cartItem => cartItem.size).includes(action.payload.size)) state.items[state.items.findIndex((cartItem) => cartItem.id === action.payload.id && cartItem.size === action.payload.size)].quantity += 1
			else state.items.push({ ...action.payload, quantity: 1 })
			localStorage.setItem(LS_KEY_CART, JSON.stringify(state.items))
		},
		removeFromCart: (state, action: PayloadAction<{ id: number, size: number }>) => {
			if (state.items[state.items.findIndex((cartItem) => cartItem.id === action.payload.id && cartItem.size === action.payload.size)].quantity > 1) {
				state.items[state.items.findIndex((cartItem) => cartItem.id === action.payload.id && cartItem.size === action.payload.size)].quantity -= 1
			} else {
				state.items = state.items.filter(
					(cartItem: ICartItemWithQuantity) => !(cartItem.id === action.payload.id && cartItem.size === action.payload.size)
				)
			}

			localStorage.setItem(LS_KEY_CART, JSON.stringify(state.items))
		},
		cleanCart: (state) => {
			state.items = []
			localStorage.setItem(LS_KEY_CART, JSON.stringify(state.items))
		},
		setBuyNowItem: (state, action: PayloadAction<ICartItemWithQuantity>) => {
			state.buyNowItem = action.payload
			localStorage.setItem(LS_KEY_BUY_NOW_ITEM, JSON.stringify(state.buyNowItem))
		}
	}
})

export const cartActions = CartSlice.actions
export const cartReducer = CartSlice.reducer
