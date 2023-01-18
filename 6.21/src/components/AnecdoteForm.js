import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.inputAnecdote.value
        event.target.inputAnecdote.value = ''
        props.createAnecdote(anecdote)
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    createAnecdote,
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm