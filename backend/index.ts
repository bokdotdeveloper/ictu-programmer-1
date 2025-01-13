
import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";

//connections and listeners
const PORT = process.env.PORT;
connectToDatabase().then(()=>{
  app.listen(PORT, ()=> console.log("Server Open and Connected to the Database 👌"));
})
.catch((error)=>console.log(error));



