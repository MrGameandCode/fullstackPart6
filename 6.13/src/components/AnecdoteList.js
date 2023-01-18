import { useSelector, useDispatch } from 'react-redux'
import reducer from '../reducers/anecdoteReducer'
import { addVote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch(reducer)

    const anecdotes = useSelector(state => {
        if (state.filter.length !== 0) {
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        } else {
            return state.anecdotes
        }

    })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
        dispatch(changeNotification('You voted ' + anecdotes.find(n => n.id === id).content))
        setTimeout(() => {
            dispatch(changeNotification(''))
        }, 5000)
    }

    return (
        <div>
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

        </div>
    )

}

export default AnecdoteForm