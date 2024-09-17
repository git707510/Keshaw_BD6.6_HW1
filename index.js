const cors = require('cors');
const express = require('express');
const app = express();

const { getAllMovies, getMovieById } = require('./controllers');

app.use(cors());
app.use(express.json());

// - Exercise 1:- Retrieve All Movies -
app.get('/movies', (req, res) => {
  try {
    const movies = getAllMovies();
    if (movies.length === 0) {
      return res.status(400).json({ message: 'No movie found' });
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// - Exercise 2: Retrieve Movie by ID -
app.get('/movies/details/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movie = getMovieById(id);
    if (!movie)
      return res.status(400).json({ message: 'no movie found for id -' + id });
    return res.status(200).json({ movie });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
