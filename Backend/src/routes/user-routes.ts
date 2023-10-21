import { Router } from "express";
import { getAllUser } from "../controllers/user-controllers.js";

const userRoutes=Router()

userRoutes.get("/",getAllUser)

export default userRoutes;