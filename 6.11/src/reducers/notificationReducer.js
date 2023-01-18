import { createSlice } from '@reduxjs/toolkit'

const initialState = 'initial state'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    changeNotification(state, action) {
      console.log(action)
      return action.payload
    },
    currentNotification(state, action) {
      console.log('curent state',state)
      return state
    }
  },
})

export const {changeNotification, currentNotification} = notificationSlice.actions
export default notificationSlice.reducer