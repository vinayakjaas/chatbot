import User from "../models/user.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).send("User already registered");
        }

        const hashPassword = await hash(password, 10); // Use await to hash the password

        const user = new User({ name, email, password: hashPassword });
        await user.save(); // Save the user to the database

        //create token and store cookies
        res.clearCookie(COOKIE_NAME,{
            domain:"localhost",
            httponly:true,
            signed:true,
            path:"/"
        });

        return res.status(201).json({ message: "User created successfully", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

export const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).send("User not registered");
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).send("Incorrect password");
    }

    res.clearCookie(COOKIE_NAME,{
        domain:"localhost",
        httponly:true,
        signed:true,
        path:"/"
    });
    const token= createToken(user._id.toString(),user.email,"7d")
    const expires=new Date();
    expires.setDate(expires.getDate()+7)
    res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httponly:true,signed:true})

    return res.status(200).json({ message: "OK" });
};