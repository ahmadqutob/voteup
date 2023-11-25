import joi from "joi";

export const generalFeild=  {
 
        email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        password:joi.string().required(),
        Cpassword:joi.string().valid(joi.ref("newPassword")).required(), 


        file:joi.object({
            fieldname :joi.string().required(),
            originalname: joi.string().required (),
            encoding: joi.string().required (),
            mimetype :joi.string().required (),
            destination:joi.string().required(),
            filename: joi.string().required (),
            path: joi.string().required(),
            size:joi.number (). positive().required (),
            dest:joi.string(),
        }), //without required -> just in profilePic required
        
        params:joi.object({
            id:joi.string().min(24).max(24).required(),
        }).required(),
} 