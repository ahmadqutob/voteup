
import {model, Schema, Types } from "mongoose";
import mongoose from "mongoose";
 
  const commentSchema= new Schema({
    
    text:{type:String, required:true},
    userId:{type:Types.ObjectId,ref:'User',required:true},
    postId:{type:Types.ObjectId,ref:'User',required:true},
    image:{type:Object  },  

    like:[{type:Types.ObjectId,ref:'User'}],
    unlike:[{type:Types.ObjectId, ref:'User'}],
     isDeleted:{type:Boolean,default:false}, // soft delete
},{timestamps:true});
 
const commentModel= mongoose.models.Comment ||model('Comment',commentSchema );
export default commentModel
