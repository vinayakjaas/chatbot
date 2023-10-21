import user from "../models/user.js";

export const getAllUser= async (req,res,next)=>{
    //get all users
    try {
        const users=await user.find();
        return res.status(200).json({message:"OK",user})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERROR", cause: error.message})
    }
};