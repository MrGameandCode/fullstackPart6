import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

    const anecdotesToShow = () => {
        if (props.filter.length !== 0) {
            return props.anecdotes.filter(anecdote => anecdote.content.includes(props.filter))
        } else {
            return props.anecdotes
        }
    }

    const vote = (id) => {
        console.log('vote', id)
        props.voteAnecdote(id)
    }

    return (
        <div>
            {anecdotesToShow().map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    voteAnecdote,
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm