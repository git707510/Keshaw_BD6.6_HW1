const request = require('supertest');
const http = require('http');

const { getAllMovies, getMovieById } = require('../controllers');
const { app } = require('../index');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Api End Points tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // - Exercise 3: Test Retrieve All Movies -
  it('should return all movies', async () => {
    let mockedMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getAllMovies.mockReturnValue(mockedMovies);

    let res = await request(server).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ]);
    expect(res.body.length).toBe(3);
  });

  // - Exercise 4: Test Retrieve Movie by ID -
  it('should retrieve movie by specific id', async () => {
    const mockedMovie = {
      movieId: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan',
    };

    getMovieById.mockReturnValue(mockedMovie);

    let res = await request(server).get('/movies/details/1');
    expect(res.status).toBe(200);
    expect(res.body.movie).toEqual(mockedMovie);
  });
});

describe('controller function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return all movies', () => {
    let mockedMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getAllMovies.mockReturnValue(mockedMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });
});
