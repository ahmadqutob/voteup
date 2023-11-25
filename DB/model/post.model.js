
import {model, Schema, Types } from "mongoose";
import mongoose from "mongoose";
 
  const postSchema= new Schema({
    
    title:{type:String, required:true},
    caption:{type:String, required:true},
    userId:{type:Types.ObjectId,ref:'User',required:true},
    image:{type:Object, required:true}, // scure_url , public_id
    like:[{type:Types.ObjectId,ref:'User'}],
    unlike:[{type:Types.ObjectId, ref:'User'}],
    totalVote:{type:Number,default:0},
    isDeleted:{type:Boolean,default:false}, // soft delete
},{timestamps:true});
 
const postModel= mongoose.models.Post ||model('Post',postSchema );
export default postModel
