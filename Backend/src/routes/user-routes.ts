import { Router } from "express";
import { getAllUser, userLogin, userSingup } from "../controllers/user-controllers.js";
import {Validate,Signupvaildators} from "../utils/validators.js"

const userRoutes=Router()

userRoutes.get("/",getAllUser)
userRoutes.post("/signup",Validate(Signupvaildators),userSingup)
userRoutes.post("/login",userLogin)

export default userRoutes;