import express, { Request, Response } from 'express';

const router = express.Router();

// Create a new movie
router.post('/create', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const { title, author, publishYear, rating } = req.body;
    const movie = await database.createMovie(title, author, publishYear, rating); // Use the createmovie function
  

    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create the movie.' });
  }
});

// Get all movies
router.get('/list', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const movies = await database.getAllMovies(); // Use the getAllmovies function
    res.status(200).json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch movies.' });
  }
});

// Get a single movie by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const movie = await database.readMovie(req.params.id); // Use the getmovieById function
    if (!movie) {
      return res.status(404).json({ error: 'movie not found.' });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the movie.' });
  }
});

// Update a movie by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const updatedmovie = await database.updateMovie(req.params.id, req.body); // Use the updatemovie function
    if (!updatedmovie) {
      return res.status(404).json({ error: 'movie not found.' });
    }
    res.status(200).json(updatedmovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update the movie.' });
  }
});

// Delete a movie by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const deletedmovie = await database.deleteMovie(req.params.id); // Use the deletemovie function
    if (!deletedmovie) {
      return res.status(404).json({ error: 'movie not found.' });
    }
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete the movie.' });
  }
});

export default router;
