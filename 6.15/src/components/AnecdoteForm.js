import { useDispatch } from 'react-redux'
import reducer from '../reducers/anecdoteReducer'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { getId } from '../reducers/anecdoteReducer'
import { changeNotification, currentNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch(reducer)
    dispatch(currentNotification())

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.inputAnecdote.value
        event.target.inputAnecdote.value = ''
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

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name="inputAnecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm