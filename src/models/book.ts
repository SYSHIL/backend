import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  publishYear: number;
  // Add other book properties here
}

const bookSchema = new Schema({
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
  // Add other book properties and validation here
});

export default mongoose.model<IBook>('Book', bookSchema);
