import { SortEnum } from '@/components/Sort/Sort.props';
import { ProductModel } from '@/interfaces/product.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
	value: ISortState;
}

interface ISortState {
	sort: SortEnum,
	products: ProductModel[],
}

const initialState = {
	value: {
		sort: 0,
		products: [],
	} as ISortState,
} as InitialState;

export const sort = createSlice({
	name: "sort",
	initialState,
	reducers: {
		setProduct: (state, action: PayloadAction<ProductModel[]>) => {
			const copyArray = [...action.payload];
			return {
				value: {
					sort: SortEnum.Rating,
					products: copyArray.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1)
				}
			};
		},
		setPrice: (state, action: PayloadAction<ProductModel[]>) => {
			const copyArray = [...action.payload];
			return {
				value: {
					sort: SortEnum.Price,
					products: copyArray.sort((a, b) => a.price > b.price ? 1 : -1)
				}
			};
		},
		addProducts: (state, action: PayloadAction<ProductModel[]>) => {
			return {
				value: {
					...state.value,
					products: action.payload
				}
			};
		},

	}
});

export const { addProducts, setProduct, setPrice } = sort.actions;
export default sort.reducer;
