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
// Create a new Song
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const { title, author, rating, subscribers, url } = req.body;
        const Song = yield database.createSong(title, author, rating, subscribers, url); // Use the createSong function
        res.status(201).json(Song);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create the Song.' });
    }
}));
// Get all Songs
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const songs = yield database.getAllSongs(); // Use the getAllSongs function
        res.status(200).json({ songs });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch Songs.' });
    }
}));
// Get a single Song by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const Song = yield database.readSong(req.params.id); // Use the getSongById function
        if (!Song) {
            return res.status(404).json({ error: 'Song not found.' });
        }
        res.status(200).json(Song);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch the Song.' });
    }
}));
// Update a Song by ID
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const updatedSong = yield database.updateSong(req.params.id, req.body); // Use the updateSong function
        if (!updatedSong) {
            return res.status(404).json({ error: 'Song not found.' });
        }
        res.status(200).json(updatedSong);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not update the Song.' });
    }
}));
// Delete a Song by ID
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let database = res.locals.database;
        const deletedSong = yield database.deleteSong(req.params.id); // Use the deleteSong function
        if (!deletedSong) {
            return res.status(404).json({ error: 'Song not found.' });
        }
        res.status(204).json();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not delete the Song.' });
    }
}));
exports.default = router;
