import express from "express";
import cors from "cors";
import songRouter from './routes/song/song.js'



export default function makeApp(database:any) {


  const app = express();

  // Middleware to handle CORS (Cross-Origin Resource Sharing)
  app.use(cors());

  // Middleware to parse JSON requests
  app.use(express.json());

  app.use('/',(req,res,next)=>{
    res.locals.database = database
    next()
  })

  // Define a sample route
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // biforcate routes

  app.use('/song',songRouter)


  // Return the Express app instance
  return app;
}

