const request = require('supertest');
const makeApp = require('./build/app.js'); // Replace with the path to your app setup

const database = {
  createMovie: jest.fn(),
  getAllMovies: jest.fn(),
  readMovie: jest.fn(),
  updateMovie: jest.fn(),
  deleteMovie: jest.fn(),
};

describe('Movie Routes', () => {
  let app;

  beforeEach(() => {
    // Create the Express app
    app = makeApp(database);

    jest.clearAllMocks();
  });

  // Test creating a new movie
  it('should create a new movie', async () => {
    // Mock the behavior of createMovie function
    database.createMovie.mockResolvedValueOnce({
      _id: 'movieId',
      title: 'Test Movie',
      author: 'Test Author',
      publishYear: 2022,
      rating: 8
    });

    const newMovieData = {
      title: 'Test Movie',
      author: 'Test Author',
      publishYear: 2022,
      rating: 8
    };

    const response = await request(app)
      .post('/movie/create')
      .send(newMovieData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newMovieData);
    expect(database.createMovie).toHaveBeenCalledWith(
      'Test Movie',
      'Test Author',
      2022, 
      8
    );
  });

  // Test updating a movie by ID
  it('should update a movie by ID', async () => {
    // Mock the behavior of updateMovie function
    const movieId = 'movieId'; // Replace with the actual movie ID
    const updatedMovieData = {
      title: 'Updated Movie',
      author: 'Updated Author',
      publishYear: 2023,
      rating: 9
    };
    database.updateMovie.mockResolvedValueOnce(updatedMovieData);

    const response = await request(app)
      .put(`/movie/update/${movieId}`)
      .send(updatedMovieData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedMovieData);
    expect(database.updateMovie).toHaveBeenCalledWith(movieId, updatedMovieData);
  });

   // Test getting a movie by ID
  it('should get a movie by ID', async () => {
    // Mock the behavior of readMovie function
    const mockMovie = {
      _id: 'movieId',
      title: 'Test Movie',
      author: 'Test Author',
      publishYear: 2022,
      rating: 8
    };
    database.readMovie.mockResolvedValueOnce(mockMovie);

    const response = await request(app).get('/movie/movieId');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockMovie);
    expect(database.readMovie).toHaveBeenCalledWith('movieId');
  });



  // Test deleting a movie by ID
  it('should delete a movie by ID', async () => {
    // Mock the behavior of deleteMovie function
    database.deleteMovie.mockResolvedValueOnce(true);

    const response = await request(app).delete('/movie/delete/movieId');

    expect(response.status).toBe(204);
    expect(database.deleteMovie).toHaveBeenCalledWith('movieId');
  });


});
