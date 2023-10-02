import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  author: string;
  publishYear: number;
  rating:number;
  // Add other movie properties here
}

const movieSchema = new Schema({
  title: {
    type: String,
    required: true, // Make 'title' field mandatory
  },
  author: {
    type: String,
    required: true, // Make 'author' field mandatory
  },
  publishYear: {
    type: Number,
    required: true, // Make 'publishYear' field mandatory
  },
  rating:{
    type:Number,
    required:true
  }
  // Add other movie properties and validation here
});

export default mongoose.model<IMovie>('movie', movieSchema);
