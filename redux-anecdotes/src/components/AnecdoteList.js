import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteOf } from '../reducers/anecdoteReducer';
import { setFilter } from '../reducers/filterReducer';
import Filter from '../components/Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterValue = event.target.value
    dispatch(setFilter(filterValue))
  }

  const filteredAnecdotes = anecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(filterValue.toLowerCase());
  });

  const sortedAnecdotes = filteredAnecdotes.sort(
    (a, b) => b.votes - a.votes
  );

  const handleVote = (id) => {
    dispatch(voteOf(id));
  };
  return (
    <div>
      <Filter onChange={handleChange} />
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
