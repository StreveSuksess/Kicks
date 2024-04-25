import { TColor, TGender, TShoesType } from './items.ts'

export interface ICartItem {
	previewImage: string,
	id: number,
	name: string,
	price: number,
	size: number,
	color: TColor,
	shoesType: TShoesType,
	gender: TGender
}