import messageModel from "../../../../DB/model/message.model.js";
import userModel from "../../../../DB/model/user.model.js";
 export const getMessage= (req,res)=>{
    return res.json({message: 'messages'})

}

export const sendMessage= async(req,res)=>{
   const {reciverId} = req.params;
   const {message} = req.body
//    console.log(reciverId, message)
const user = await userModel.findById(reciverId);
// return res.json(user)
console.log(req.id)
if(!user){
 return res.status(404).json({message : 'user not found'});
}
const createMessage=  messageModel.create({reciverId},{message})
  return res.json({mesasge: 'success',createMessage})

 

}




export const deleteMessage= async(req,res)=>{
    const id = req.id;
    const {messageId}= req.params;
     
    const message= await messageModel.deleteOne({_id:messageId,receiverId:id})
// return res.json({mesasge: 'success',DeleteMessage})


 
 if(message.deletedCount == 0){
    return res.json({mesasge: 'invalid user id or message id',message})

}
return res.json({mesasge: 'success',message})

}