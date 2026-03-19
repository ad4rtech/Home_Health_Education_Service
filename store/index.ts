import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import quarterReducer from './slices/quarterSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quarter: quarterReducer,
    notification: notificationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
