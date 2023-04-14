import React, { useReducer } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { createAnecdote, getAnecdotes, updateAnecdote } from "./requests";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return { message: `Added new anecdote: ${action.payload}` };
    case "VOTE_NOTIFICATION":
      return { message: `An anecdote is voted on: ${action.payload}`};
    default:
      return state;
  }
};

const App = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
  });

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData("anecdotes", (old) => [...old, newAnecdote]);
      setTimeout(() => {
        notificationDispatch({
          type: "NEW_NOTIFICATION",
          payload: newAnecdote.content,
        });
      }, 2000);
    }
  });

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData("anecdotes", (old) =>
        old.map((a) =>
          a.id === updatedAnecdote.id ? updatedAnecdote : a
        )
      );
      setTimeout(() => {
        notificationDispatch({
          type: "VOTE_NOTIFICATION",
          payload: updatedAnecdote.content,
        });
      }, 2000);
    },
  });

  const { data: anecdotes, isLoading } = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      {notification.message && (
        <Notification message={notification.message} />
      )}
      <AnecdoteForm onSubmit={newAnecdoteMutation.mutate} />

      {isLoading ? (
        <div>loading data...</div>
      ) : (
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
