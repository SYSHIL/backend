import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/book'

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
  dummyFunc : function(){
    console.log("helloworld")
  }

  // create user 

  // update user

  // delete user

  // read user
}

export default database;
