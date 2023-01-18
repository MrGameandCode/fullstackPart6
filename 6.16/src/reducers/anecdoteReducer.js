import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { changeNotification } from '../reducers/notificationReducer'


const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      console.log(action)
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const anecdoteChanged = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id === id ? anecdoteChanged : anecdote
      ).sort((prev, current) => current.votes - prev.votes)

    },
    addAnecdote(state, action) {
      console.log(action)
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      state.push(newAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((prev, current) => current.votes - prev.votes)
    dispatch(setAnecdotes(anecdotes))
  }
}

const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {
      content: anecdote,
      id: getId(),
      votes: 0
  }
  anecdoteService.create(newAnecdote).then(() => {
    dispatch(appendAnecdote(newAnecdote))
    dispatch(changeNotification('New anecdote added: ' + anecdote))
    setTimeout(() => {
        dispatch(changeNotification(''))
    }, 5000)
})
  }
}

export const { addVote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export { getId, initializeAnecdotes, createAnecdote }
export default anecdoteSlice.reducer