const request = require('supertest');
const makeApp = require('./build/app.js'); // Replace with the path to your app setup
const mockingoose = require('mockingoose');

const app = makeApp()

describe('Book Routes', () => {
  let createdBookId
  beforeEach(() => {
    mockingoose(Book).reset();
  });
  // Test creating a new book
  it('should create a new book', async () => {

    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      email: 'name@email.com',
    };


    // Make a POST request to your API route that creates a new book
    const response = await request(app)
      .post('/book/create')
      .send(newBookData);

    // Ensure the response status is 201 (created)
    expect(response.status).toBe(201);

    // Ensure the response contains the created book data
    expect(response.body).toMatchObject(newBookData);
    
  });
  it('should reach hello world', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200);

  });
 
 
});
