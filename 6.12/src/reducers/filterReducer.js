import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter(state, action) {
      return action.payload
    }
  },
})

export const {changeFilter} = FilterSlice.actions
export default FilterSlice.reducer