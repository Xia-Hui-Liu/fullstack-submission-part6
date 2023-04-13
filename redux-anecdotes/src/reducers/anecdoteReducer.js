import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'
  
const anecdoteSlice = createSlice({
  name: 'anecdotes', 
  initialState: [], 
  reducers:{
    voteOf: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes++
      }
    }, 
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { voteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer