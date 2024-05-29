import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import dataModels from "../models/dataModels.js"
import JWT from "jsonwebtoken";

export const createDataController= async(req,res)=>{
 try{
    //get from the body
    const {name,email,password,jobTitle,dateOfBirth} =req.body
    //validation
       
       switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !email:
          return res.status(500).send({ error: "email is Required" });
        case !password:
          return res.status(500).send({ error: "password is Required" });
        case !jobTitle:
          return res.status(500).send({ error: "job title is Required" });
        case !dateOfBirth:
          return res.status(500).send({ error: "Date-ofBirth is Required" });
      }

//check user
    const exisitingUser = await dataModels.findOne({ email });
    //exisiting user check 
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
      //register user
      const hashedPassword = await hashPassword(password);
    //emp data creation
      const empData = new dataModels({name,email,
        password:hashedPassword,
        jobTitle,dateOfBirth});
    
      await empData.save();
      res.status(201).send({
        success: true,
        message: "Emp data is Created Successfully",
        empData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating Emp data",
      });
    }
  };


 
//get the data


export const  getDataController =async(req,res)=>{
 try{
    //get the data from modals
 const Alldata = await dataModels.find({}).sort({createdAt:-1});
 
      //success response
       res.status(200).send({
        length:Alldata.length,
        success:true,
        Message:"Get your emp data here",
        Alldata,
        
    })
 }catch(error){
        res.status(400).send({
        success:true,
        message:"Error in creating emp data"
    })
 }
}

export const loginController=async(req,res)=>{
    try{

        const { email, password } = req.body;
        //validation
        if (!email || !password) {
          return res.status(404).send({
            success: false,
            message: "Invalid email or password",
          });
        }
        //check user
        const user = await dataModels.findOne({ email });
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Email is not registerd",
          });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
          return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });
        }
        //token
        const token =await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.status(200).send({
          success: true,
          message: "login successfully",
          user: {
            _id: user._id,
            name:user.name,
            email:user.email,
            role: user.role
          },
          token,
        });
  
    }catch(error){
        res.status(400).send({
            success:true,
            message:"Error in login"
        })

    }
}



  // Find the most recent OTP for the email
//   const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
//   console.log(response)
//   if (response.length === 0) {
//     // OTP not found for the email
//     return res.status(400).json({
//       success: false,
//       message: "The OTP is not valid",
//     })
//   } else if (otp !== response[0].otp) {
//     // Invalid OTP
//     return res.status(400).json({
//       success: false,
//       message: "The OTP is not valid",
//     })
//   }
