import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filterBy = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter((anecdote) => 
    anecdote.content.toLowerCase().includes(filterBy.toLowerCase()))
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`you voted for '${anecdote.content}'`, 10))
    }

    const byVotes = (a1, a2) => a2.votes - a1.votes

    return(  
        <div>
            {filteredAnecdotes.sort(byVotes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList