import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function Main() {
    try {
        
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    app.listen(config.port, ()=>{
        console.log(`Server running on port ${config.port}`)
    })
    } catch (error) {
        console.log("Server connection failed.")
        console.log(error)
    }
}

Main()