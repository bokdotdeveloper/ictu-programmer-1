
import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";

//connections and listeners
const PORT = process.env.PORT || 5001;
connectToDatabase().then(()=>{
  app.listen(5001, ()=> console.log("Server Open and Connected to the Database 👌"));
})
.catch((error)=>console.log(error));



