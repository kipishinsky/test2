import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {rootReducer} from './reducer/rootReducer'
import {configureStore} from '@reduxjs/toolkit'

export type RootStateType = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
	root: rootReducer
})

export const reduxStore = configureStore({
	reducer: rootReducers,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})
