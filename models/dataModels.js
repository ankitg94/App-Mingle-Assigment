
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String,
    },
    jobTitle:{
        type:String,
    },
   
    dateOfBirth:{
        type:Date
    },
    photo:{
        data: Buffer,
        contentType: String,
      },
      role:{
        type: Number,
        default: 0,
      },
   
},{timestamps:true})

const dataModels = mongoose.model('EmpData',DataSchema)
export default dataModels;

