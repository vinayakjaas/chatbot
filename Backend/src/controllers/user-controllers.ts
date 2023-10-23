import User from "../models/user.js";
import {hash} from 'bcrypt'

export const getAllUser= async (req,res,next)=>{
    //get all users
    try {
        const users=await User.find();
        return res.status(200).json({message:"OK",User})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERROR", cause: error.message})
    }
};

export const userSingup=async (req,res,next)=>{
    try {
        const {name,email,password}=req.body;
        const hashPassword=hash(password,10)
        const user=new User({name,email,password:hashPassword})
        return res.status(200).json({message:"OK",id:user._id.toString()});


    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"ERROR", cause: error.message})
    }
}
export const userLogin= async (req,res,next)=>{
    const {email,password}=req.body;
    const loginuser=new User({email,password})
    return res.status(200).json({message:"Login successfully"})


}