import { useDispatch } from 'react-redux'
import reducer from '../reducers/anecdoteReducer'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, currentNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {

    const dispatch = useDispatch(reducer)
    dispatch(currentNotification())

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.inputAnecdote.value
        event.target.inputAnecdote.value = ''
        dispatch(addAnecdote(anecdote))
        dispatch(changeNotification('New anecdote added: ' + anecdote))
        setTimeout(() => {
            dispatch(changeNotification(''))
          }, 5000)
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