import express, { Request, Response } from 'express';

const router = express.Router();

// Create a new Song
router.post('/create', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const { title, author, rating, subscribers, url} = req.body;
    const Song = await database.createSong(title, author, rating,subscribers, url); // Use the createSong function
  
    res.status(201).json(Song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create the Song.' });
  }
});

// Get all Songs
router.get('/list', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const songs = await database.getAllSongs(); // Use the getAllSongs function
    res.status(200).json({ songs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch Songs.' });
  }
});

// Get a single Song by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const Song = await database.readSong(req.params.id); // Use the getSongById function
    if (!Song) {
      return res.status(404).json({ error: 'Song not found.' });
    }
    res.status(200).json(Song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the Song.' });
  }
});

// Update a Song by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const updatedSong = await database.updateSong(req.params.id, req.body); // Use the updateSong function
    if (!updatedSong) {
      return res.status(404).json({ error: 'Song not found.' });
    }
    res.status(200).json(updatedSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update the Song.' });
  }
});

// Delete a Song by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    let database = res.locals.database
    const deletedSong = await database.deleteSong(req.params.id); // Use the deleteSong function
    if (!deletedSong) {
      return res.status(404).json({ error: 'Song not found.' });
    }
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete the Song.' });
  }
});

export default router;
