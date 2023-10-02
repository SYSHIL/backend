// routes/bookRoutes.ts
import express, { Request, Response } from 'express';
import Book, { IBook } from '../../models/book.js'

const router = express.Router();

// Create a new book
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { title, author, publishYear } = req.body;
    const book: IBook = new Book({ title, author, publishYear });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create the book.' });
  }
});

// Get all books
router.get('/list', async (req: Request, res: Response) => {
  try {
    const books = await Book.find({});
    res.status(200).json({books})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch books.' });
  }
});

// Get a single book by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the book.' });
  }
});

// Update a book by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update the book.' });
  }
});


router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete the book.' });
  }
});

module.exports = router;


export default router;


