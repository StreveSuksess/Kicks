import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { db } from '../firebase.ts'
import { child, get, ref, set } from 'firebase/database'
import { item } from '../interfaces/items.ts'
import { loginData, registerData } from '../interfaces/IAuth.ts'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { IUser } from '../interfaces/IUser.ts'


export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Auth'],
	endpoints: (build) => ({
		registerUser: build.mutation<any, registerData>({
			queryFn: async (registerData): Promise<any> => {
				try {
					const auth = getAuth()
					const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
					await set(ref(db, 'profiles/' + userCredential.user.uid), {
						firstName: registerData.firstName,
						lastName: registerData.lastName,
						email: registerData.email
					})
					return userCredential.user.uid
				} catch (e) {
					alert('Invalid user')
					console.log(e)
				}
			},
			invalidatesTags: ['Auth']
		}),
		loginUser: build.mutation<any, loginData>({
			queryFn: async ({ email, password }): Promise<any> => {
				const auth = getAuth()
				return signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						return userCredential.user.uid
					})
					.catch((error) => {
						alert('Invalid user')
						console.log(error)
					})
			}
		}),
		logoutUser: build.mutation<item, null>({
			queryFn: async (): Promise<any> => {
				const auth = getAuth()
				await signOut(auth)
			}
		}),
		fetchProfileInfo: build.query<IUser, string>({
			queryFn: async (id: string): Promise<any> => {
				try {
					const snapshot = await get(child(ref(db), '/profiles/' + id))
					const profileData = snapshot.val()
					if (profileData === null) return
					return { data: profileData }
				} catch (error) {
					return error
				}
			},
			providesTags: ['Auth']
		})
	})
})

