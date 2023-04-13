import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteOf } from '../reducers/anecdoteReducer';
import { setFilter } from '../reducers/filterReducer';
import Filter from './Filter';
import { setNotification } from '../reducers/notificationReducer';
import Notification from './Notification';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filterValue = useSelector(state => state.filter);
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterValue = event.target.value;
    dispatch(setFilter(filterValue));
  };

  const filteredAnecdotes = anecdotes.filter(anecdote => {
    const content = anecdote.content;
    if (typeof content !== 'string') {
      return false;
    }
    return content.toLowerCase().includes(filterValue.toLowerCase());
  });
  
  const sortedAnecdotes = filteredAnecdotes.sort(
    (a, b) => b.votes - a.votes
  );

  const handleVote = (anecdote) => {
    dispatch(voteOf(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`));
    setTimeout(() => dispatch(setNotification('')), 5000);
  };

  return (
    <div>
      {notification ? (
        <Notification message={notification} />
      ) : (
        <Filter onChange={handleChange} />
      )}
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
