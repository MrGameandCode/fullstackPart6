import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'


const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
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
      dispatch(setNotification('New anecdote added: ' + anecdote, 10))
    })
  }
}

const voteAnecdote = (id) => {
  return async dispatch => {
    anecdoteService.get(id).then((anecdote) => {
      const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      anecdoteService.update(newAnecdote.id, newAnecdote).then(() => {
        dispatch(addVote(id))
        dispatch(setNotification('You voted ' + newAnecdote.content, 10))
      })
    })
  }
}

export const { addVote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export { getId, initializeAnecdotes, createAnecdote, voteAnecdote }
export default anecdoteSlice.reducer