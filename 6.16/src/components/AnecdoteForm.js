import { useDispatch } from 'react-redux'
import reducer from '../reducers/anecdoteReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch(reducer)

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.inputAnecdote.value
        event.target.inputAnecdote.value = ''
        dispatch(createAnecdote(anecdote))
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