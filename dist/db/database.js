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
const movie_1 = __importDefault(require("../models/movie"));
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
    // Function to create a Movie
    createMovie: function (title, author, publishYear, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = new movie_1.default({ title, author, publishYear, rating });
                const savedMovie = yield movie.save();
                return savedMovie;
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Function to update a Movie by ID
    updateMovie: function (MovieId, updatedMovieData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMovie = yield movie_1.default.findByIdAndUpdate(MovieId, updatedMovieData, { new: true });
                return updatedMovie;
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Function to delete a Movie by ID
    deleteMovie: function (MovieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedMovie = yield movie_1.default.findByIdAndRemove(MovieId);
                return !!deletedMovie;
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Function to read a Movie by ID
    readMovie: function (MovieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield movie_1.default.findById(MovieId);
                return movie;
            }
            catch (error) {
                throw error;
            }
        });
    },
    // Function to get all Movies
    getAllMovies: function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield movie_1.default.find();
                return movies;
            }
            catch (error) {
                throw error;
            }
        });
    },
};
exports.default = database;
