import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: any | null
  profile: any | null
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any; profile: any }>) => {
      state.user = action.payload.user
      state.profile = action.payload.profile
      state.isLoading = false
    },
    clearUser: (state) => {
      state.user = null
      state.profile = null
      state.isLoading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setUser, clearUser, setLoading } = authSlice.actions
export default authSlice.reducer
