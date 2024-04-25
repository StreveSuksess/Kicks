import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { db } from '../firebase.ts'
import { child, get, ref } from 'firebase/database'
import { item } from '../interfaces/items.ts'


export const productsApi = createApi({
	reducerPath: 'products',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Products'],
	endpoints: (build) => ({
		fetchProducts: build.query<item[], number>({
			queryFn: async (limit: number = 100): Promise<any> => {
				try {
					const snapshot = await get(child(ref(db), '/products'))
					const productsData = snapshot.val()
					if (productsData === null) return
					return { data: productsData.slice(0, limit) }
				} catch (error) {
					return error
				}
			},
			providesTags: ['Products']
		}),
		fetchProduct: build.query<item, number>({
			queryFn: async (id: number): Promise<any> => {
				try {
					const snapshot = await get(child(ref(db), '/products/' + id))
					const productData = snapshot.val()
					if (productData === null) return
					return { data: productData }
				} catch (error) {
					return error
				}
			},
			providesTags: ['Products']
		})
	})
})

