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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const song_1 = __importDefault(require("../models/song"));
dotenv_1.default.config();
const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
    throw new Error('Connection string not found in the environment variables.');
}
mongoose_1.default
    .connect(connectionString)
    .then(() => {
    console.log("Mongo connected");
})
    .catch(error => {
    console.error('Error while connecting to MongoDB:', error);
});
let database = {
    // Function to create a song
    createSong: function (title, author, rating, subscribers, url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const song = new song_1.default({ title, author, rating, subscribers, url });
                const savedsong = yield song.save();
                return savedsong;
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Function to update a song by ID
    updateSong: function (songId, updatedsongData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedsong = yield song_1.default.findByIdAndUpdate(songId, updatedsongData, { new: true });
                return updatedsong;
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Function to delete a song by ID
    deleteSong: function (songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedsong = yield song_1.default.findByIdAndRemove(songId);
                return !!deletedsong;
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Function to read a song by ID
    readSong: function (songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const song = yield song_1.default.findById(songId);
                return song;
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Function to get all songs
    getAllSongs: function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songs = yield song_1.default.find();
                return songs;
            }
            catch (error) {
                throw error;
            }
        });
    },
};
exports.default = database;
