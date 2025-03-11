
import colors from 'colors'
import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config()

const connectionDB= async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.bgGreen.black.bold(`Mongo has connected on ${url}`));
    } catch (error) {
        console.log(`======================`);
        console.log(colors.bgRed.black.bold(error.message));
        console.log(`======================`);
        process.exit(1)
        
    }
}

export default connectionDB