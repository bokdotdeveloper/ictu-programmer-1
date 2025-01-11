
import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";

//connections and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase().then(()=>{
  app.listen(5000, ()=> console.log("Server Open and Connected to the Database 👌"));
})
.catch((error)=>console.log(error));


/*
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

let isDbConnected = false;

export default async function handler(req, res) {
  try {
    // Connect to the database only once
    if (!isDbConnected) {
      await connectToDatabase();
      isDbConnected = true;
      console.log("Database Connected 👌");
    }

    // Forward the request to the app
    app(req, res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}
*/
