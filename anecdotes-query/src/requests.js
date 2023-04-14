import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios
        .get(baseUrl)
        .then(res => res.data)
        .catch(error => {
            console.log('An error occurred while fetching the anecdotes.', error)
        })
}

export const createAnecdote = newAnecdote => {
    return axios
        .post(baseUrl, newAnecdote)
        .then(res => res.data)
        .catch(error => {
            console.log('An error occurred while creating the anecdote.', error)
        })
}

export const updateAnecdote = updatedAnecdote => {
    return axios
        .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
        .then(res => res.data)
        .catch(error => {
            console.log('An error occurred while updating the anecdote.', error)
        })
}
