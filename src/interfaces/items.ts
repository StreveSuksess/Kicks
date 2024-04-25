export interface item {
	previewImage: string,
	allImages: string[],
	id: number,
	name: string,
	price: number,
	sizes: number[],
	color: TColor,
	description: string,
	shoesType: TShoesType,
	gender: TGender
}

export type TGender = 'Men' | 'Women'
export type TShoesType = 'Sneakers' | 'Runners' | 'Hiking' | 'Soccer' | 'Golf' | 'Basketball' | 'Football'
export type TColor =
	'blue'
	| 'yellow'
	| 'black'
	| 'green'
	| 'darkgray'
	| 'orange'
	| 'white'
	| 'lightgray'
	| 'brown'
	| 'lightbrown'
