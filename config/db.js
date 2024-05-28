import mongoose  from "mongoose"
export const dbConnect =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("monogoDb connected successfully")
    
    }
    catch(error){
      console.log("Error in connecting the database")
    }
}    