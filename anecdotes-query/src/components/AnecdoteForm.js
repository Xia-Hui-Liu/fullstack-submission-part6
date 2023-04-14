import React from 'react';

const AnecdoteForm = ({ onSubmit }) => {
  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const id = Math.floor(Math.random() * 10000);
    onSubmit({ content, votes: 0, id });
  };

  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
