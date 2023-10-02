"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Create a new movie
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const { title, author, publishYear, rating } = req.body;
        const movie = yield database.createMovie(title, author, publishYear, rating); // Use the createmovie function
        res.status(201).json(movie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create the movie.' });
    }
}));
// Get all movies
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const movies = yield database.getAllMovies(); // Use the getAllmovies function
        res.status(200).json({ movies });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch movies.' });
    }
}));
// Get a single movie by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const movie = yield database.readMovie(req.params.id); // Use the getmovieById function
        if (!movie) {
            return res.status(404).json({ error: 'movie not found.' });
        }
        res.status(200).json(movie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch the movie.' });
    }
}));
// Update a movie by ID
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const updatedmovie = yield database.updateMovie(req.params.id, req.body); // Use the updatemovie function
        if (!updatedmovie) {
            return res.status(404).json({ error: 'movie not found.' });
        }
        res.status(200).json(updatedmovie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not update the movie.' });
    }
}));
// Delete a movie by ID
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const deletedmovie = yield database.deleteMovie(req.params.id); // Use the deletemovie function
        if (!deletedmovie) {
            return res.status(404).json({ error: 'movie not found.' });
        }
        res.status(204).json();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not delete the movie.' });
    }
}));
exports.default = router;
