import express from "express"
import { createDataController, getDataController, loginController } from "../Controllers/dataController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"


const route =express.Router()
//create emp data
route.post("/create",createDataController)
//read emp data
route.get("/get",requireSignIn, isAdmin,getDataController) ;
//login
route.post("/login",loginController)







export default route