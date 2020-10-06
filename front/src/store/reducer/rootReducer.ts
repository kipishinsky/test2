import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialStateType} from '../../types/root-reducer-types'

const initialState: initialStateType = {
	count: 0
}

const slice = createSlice({
	name: 'root',
	initialState: initialState,
	reducers: {
		setCountAC(state, action: PayloadAction<{ value: number }>) {
			state.count = action.payload.value
		}
	}
})

export const rootReducer = slice.reducer

//action
export const {setCountAC} = slice.actions


