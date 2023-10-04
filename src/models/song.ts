import mongoose, { Schema, Document } from 'mongoose';

export interface ISong extends Document {
  title: string;
  author: string;
  rating:number;
  // Add other Song properties here
}

const SongSchema = new Schema({
  title: {
    type: String,
    required: true, // Make 'title' field mandatory
  },
  author: {
    type: String,
    required: true, // Make 'author' field mandatory
  },
  rating:{
    type:Number,
    required:true
  },
  subscribers :{
    type:Number
  },
  url: String, 
});

export default mongoose.model<ISong>('Song', SongSchema);
