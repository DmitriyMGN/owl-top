import { MenuItem } from '@/interfaces/menu.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
	value: IServerState;
}

interface IServerState {
	firstCategory: number | null,
	menu: MenuItem[]
}

const initialState = {
	value: {
		firstCategory: 0,
		menu: [],
	} as IServerState,
} as InitialState;

export const server = createSlice({
	name: "server",
	initialState,
	reducers: {
		setFirstCategory: (state, action: PayloadAction<number | null>) => {
			return {
				value: {
					firstCategory: action.payload,
					menu: state.value.menu
				}
			};
		},
		setMenu: (state, action: PayloadAction<MenuItem[]>) => {
			return {
				value: {
					firstCategory: state.value.firstCategory,
					menu: action.payload
				}
			};
		},
	}
});

export const { setFirstCategory, setMenu } = server.actions;
export default server.reducer;
