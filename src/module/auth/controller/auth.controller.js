import { hash } from "bcrypt";
import userModel from "../../../../DB/model/user.model.js";
import { compare } from "../../../services/hashAndCompare.js";
import { generateToken, verifyToken } from "../../../services/generateAndVeryfyToken.js";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../services/sendEmail.js";
import { asyncHandler } from "../../../services/errorHandler.js";
export const signup =asyncHandler( async(req,res,next)=>{

 

const {username,email,password} = req.body;
//  console.log(username,email,password);

const user = await userModel.findOne({email});
 
if(user){
    // return res.json({messsage: 'email is already existed'})
    return next(new Error('Email already exists')); 
}
const hashPassword = await hash(password,8);
// token to send email to confairm email function and update it to -> (confirmEmail:true)
const token = await generateToken({email},process.env.CONFAIRM_SEGNATURE)

 
const link =`http://localhost:3000/auth/confairmEmail/${token}`;
await sendEmail(email,'subject test Confairm email',`<a href="${link}">verify your email</a>`)

const newUser = await userModel.create({email,username,password:hashPassword});
 

return  res.status(201).json({message: 'DONE ! ' , newUser}) 

 
 

}
)


 

    export const confairmEmail= async(req,res)=>{
        const {token} = req.params
        
        
           const decoded =await jwt.verify(token,process.env.CONFAIRM_SEGNATURE)
         

            //   return res.json({message:decoded})

         const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true})
         
        //  return res.json({message:'your email is confirmed ',user})
            // redirect user to login  
            return res.redirect('https://jwt.io/')
        
       }
 
 



export const signin=asyncHandler( async (req,res,next)=>{


const {email,password} = req.body;
 const user = await userModel.findOne({email});

if(!user){
 return next(new Error('email is not exist'))
}
else{
    if(!user.confairmEmail){
         return next(new Error('plz verify your email'))
    } 
}
const match = await compare(password,user.password);
 if(password === user.password){
    // console.log(user._id)
     const token = jwt.sign({id:user._id},process.env.SEGNATURE,{expiresIn:'50h'})
//    check if token expired 
    const decoded =await jwt.verify(token,process.env.SEGNATURE)
    const {exp} = decoded ;
    if (exp < (new Date().getTime() + 1) / 1000) {
        return res.json({message: 'jwt/token expiered' })
    }
    return res.json({message: 'DONE !', token})
}else{
        return next(new Error('password is invalid'))


}

})