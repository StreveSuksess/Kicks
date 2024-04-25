import { child, get, getDatabase, ref } from 'firebase/database'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyD2XRRhdUESncLiXvh25_VGMEErS4hegbk',
	authDomain: 'strevesuksess-kicks.firebaseapp.com',
	databaseURL: 'https://strevesuksess-kicks-default-rtdb.firebaseio.com',
	projectId: 'strevesuksess-kicks',
	storageBucket: 'strevesuksess-kicks.appspot.com',
	messagingSenderId: '548880934379',
	appId: '1:548880934379:web:6c79fdffe42fb77e1c65ae'
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)

export const firebase = {
	async getProducts() {
		const snapshot = await get(child(ref(db), '/'))
		const productsData = snapshot.val()
		if (productsData === null) return
		return productsData
	}
}