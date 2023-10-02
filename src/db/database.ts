import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie, { IMovie } from '../models/movie';
dotenv.config();

const connectionString: string | undefined = process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Connection string not found in the environment variables.');
}

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch(error => {
    console.error('Error while connecting to MongoDB:', error);
  });


 let database = {
    // Function to create a Movie
    createMovie: async function (title: string, author: string, publishYear: number,rating: number): Promise<IMovie> {
      try {
        const movie = new Movie({ title, author, publishYear, rating });
        const savedMovie = await movie.save();
        return savedMovie;
      } catch (error) {
        throw error;
      }
    },
  
    // Function to update a Movie by ID
    updateMovie: async function (MovieId: string, updatedMovieData: Partial<IMovie>): Promise<IMovie | null> {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(MovieId, updatedMovieData, { new: true });
        return updatedMovie;
      } catch (error) {
        throw error;
      }
    },
  
    // Function to delete a Movie by ID
    deleteMovie: async function (MovieId: string): Promise<boolean> {
      try {
        const deletedMovie = await Movie.findByIdAndRemove(MovieId);
        return !!deletedMovie;
      } catch (error) {
        throw error;
      }
    },
  
    // Function to read a Movie by ID
    readMovie: async function (MovieId: string): Promise<IMovie | null> {
      try {
        const movie = await Movie.findById(MovieId);
        return movie;
      } catch (error) {
        throw error;
      }
    },

    // Function to get all Movies
    getAllMovies: async function (): Promise<IMovie[] | null> {
      try {
        const movies = await Movie.find()
        return movies;
      } catch (error) {
        throw error;
      }
    },
  };
    
export default database;
