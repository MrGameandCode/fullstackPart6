import { createSlice } from '@reduxjs/toolkit'

const initialState = 'initial state'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
    currentNotification(state, action) {
      console.log('curent state', state)
      return state.message
    }
  },
})

const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(changeNotification(message))
    if(message.length !== 0){
      setTimeout(() => {
        dispatch(changeNotification(''))
      }, (seconds * 1000))
    }
  }
}

export const { changeNotification, currentNotification } = notificationSlice.actions
export { setNotification }
export default notificationSlice.reducer