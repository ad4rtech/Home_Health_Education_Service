import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface QuarterState {
  activeQuarter: any | null
  isLoading: boolean
}

const initialState: QuarterState = {
  activeQuarter: null,
  isLoading: true,
}

export const quarterSlice = createSlice({
  name: 'quarter',
  initialState,
  reducers: {
    setActiveQuarter: (state, action: PayloadAction<any>) => {
      state.activeQuarter = action.payload
      state.isLoading = false
    },
    clearQuarter: (state) => {
      state.activeQuarter = null
      state.isLoading = false
    },
  },
})

export const { setActiveQuarter, clearQuarter } = quarterSlice.actions
export default quarterSlice.reducer
