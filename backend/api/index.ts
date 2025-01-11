/*
import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";

//connections and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase().then(()=>{
  app.listen(5000, ()=> console.log("Server Open and Connected to the Database 👌"));
})
.catch((error)=>console.log(error));
*/
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from "./db/connection.js";


const app = express();

// Enable CORS for your client URL
app.use(cors({
  origin: 'https://kasubay-ai.vercel.app', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials if needed
}));

// Root path route
app.get('/', (req, res) => {
  res.send('Connected to the database and server is running!'); // Customize this message
});

// Other routes go here...

// Make sure you are handling the database connection before starting the server
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} and connected to the database!`));
}).catch((error) => {
  console.error('Database connection failed', error);
});

