import { useSelector, useDispatch } from 'react-redux'
import reducer from './reducers/anecdoteReducer'
import { addVote, addAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch(reducer)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const newAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.inputAnecdote.value
    event.target.inputAnecdote.value = ''
    dispatch(addAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="inputAnecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App