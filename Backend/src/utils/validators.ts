import { body,ValidationChain,validationResult } from "express-validator"

export const Validate =(validations: ValidationChain[])=>{
    return async (req,res,next)=>{
        for(let validation of  validations){
            const result=await validation.run(req)
            if (!result.isEmpty()) {
                break;
            }
             
        }
        const error=validationResult(req);
        if (error.isEmpty) {
            return next();
        }
        return res.status(400).json({error:error.array()});

    }
};
export const Signupvaildators=[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).notEmpty().withMessage("Password should contain atleast 6 character"),

]