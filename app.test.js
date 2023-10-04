const request = require('supertest');
const makeApp = require('./dist/app.js'); // Replace with the path to your app setup

const database = {
  createsong: jest.fn(),
  getAllsongs: jest.fn(),
  readsong: jest.fn(),
  updatesong: jest.fn(),
  deletesong: jest.fn(),
};

describe('song Routes', () => {
  let app;

  beforeEach(() => {
    // Create the Express app
    app = makeApp(database);

    jest.clearAllMocks();
  });

  // Test creating a new song
  it('should create a new song', async () => {
    // Mock the behavior of createsong function
    database.createsong.mockResolvedValueOnce({
      _id: 'songId',
      title: 'Test song',
      author: 'Test Author',
      rating: 8
    });

    const newsongData = {
      title: 'Test song',
      author: 'Test Author',
      rating: 8
    };

    const response = await request(app)
      .post('/song/create')
      .send(newsongData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newsongData);
    expect(database.createsong).toHaveBeenCalledWith(
      'Test song',
      'Test Author',
      2022, 
      8
    );
  });

  // Test updating a song by ID
  it('should update a song by ID', async () => {
    // Mock the behavior of updatesong function
    const songId = 'songId'; // Replace with the actual song ID
    const updatedsongData = {
      title: 'Updated song',
      author: 'Updated Author',
      rating: 9
    };
    database.updatesong.mockResolvedValueOnce(updatedsongData);

    const response = await request(app)
      .put(`/song/update/${songId}`)
      .send(updatedsongData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedsongData);
    expect(database.updatesong).toHaveBeenCalledWith(songId, updatedsongData);
  });

   // Test getting a song by ID
  it('should get a song by ID', async () => {
    // Mock the behavior of readsong function
    const mocksong = {
      _id: 'songId',
      title: 'Test song',
      author: 'Test Author',
      rating: 8
    };
    database.readsong.mockResolvedValueOnce(mocksong);

    const response = await request(app).get('/song/songId');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mocksong);
    expect(database.readsong).toHaveBeenCalledWith('songId');
  });



  // Test deleting a song by ID
  it('should delete a song by ID', async () => {
    // Mock the behavior of deletesong function
    database.deletesong.mockResolvedValueOnce(true);

    const response = await request(app).delete('/song/delete/songId');

    expect(response.status).toBe(204);
    expect(database.deletesong).toHaveBeenCalledWith('songId');
  });


});
