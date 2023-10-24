import { Router } from "express";
import { getAllUser, userLogin, userSignup } from "../controllers/user-controllers.js";


const userRoutes=Router()

userRoutes.get("/",getAllUser)
userRoutes.post("/signup",userSignup)
userRoutes.post("/login",userLogin)

export default userRoutes;