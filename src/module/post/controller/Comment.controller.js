import commentModel from '../../../../DB/model/comment.model.js';
import cloudinary from '../../../services/cloudinary.service.js'
import { asyncHandler } from '../../../services/errorHandler.js';
export const addCommaent= asyncHandler(async (req,res,next)=>{

req.body.userId = req.id;
req.body.postId= req.params.id

if(req.file){
     const {secure_url,public_id}= await  cloudinary.uploader.upload(req.file.path,{folder:'commaent'})
    req.body.image= {secure_url,public_id}
    }
// not defined because its in the private scope
// return res.json(secure_url,public_id) //
// الحل  هو وضع اسماء الملفات داخل اوبجكت البودي

// return res.json(req.body)
const comment = await commentModel.create(req.body)
return res.json({message: 'success' , comment})
}) 