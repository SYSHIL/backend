import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Song, { ISong } from '../models/song';
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
    // Function to create a song
    createSong: async function (title: string, author: string,rating: number,subscribers:number,url:string): Promise<ISong> {
      try {
        const song = new Song({ title, author, rating, subscribers, url});
        const savedsong = await song.save();
        return savedsong;
      } catch (error) {
        throw error;
      }
    },
  
    // Function to update a song by ID
    updateSong: async function (songId: string, updatedsongData: Partial<ISong>): Promise<ISong | null> {
      try {
        const updatedsong = await Song.findByIdAndUpdate(songId, updatedsongData, { new: true });
        return updatedsong;
      } catch (error) {
        throw error;
      }
    },
  
    // Function to delete a song by ID
    deleteSong: async function (songId: string): Promise<boolean> {
      try {
        const deletedsong = await Song.findByIdAndRemove(songId);
        return !!deletedsong;
      } catch (error) {
        throw error;
      }
    },
  
    // Function to read a song by ID
    readSong: async function (songId: string): Promise<ISong | null> {
      try {
        const song = await Song.findById(songId);
        return song;
      } catch (error) {
        throw error;
      }
    },

    // Function to get all songs
    getAllSongs: async function (): Promise<ISong[] | null> {
      try {
        const songs = await Song.find()
        return songs;
      } catch (error) {
        throw error;
      }
    },
  };
    
export default database;
