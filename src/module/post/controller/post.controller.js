import { asyncHandler } from "../../../services/errorHandler.js";
import cloudinary from '../../../services/cloudinary.service.js'
import postModel from "../../../../DB/model/post.model.js";
import commentModel from "../../../../DB/model/comment.model.js";
export const getPost =asyncHandler(async (req, res, next)=>{
    

    const cursor=  postModel.find({}).cursor();

    const postsList=[];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        console.log(doc); // Prints documents one at a time
      const comment= await commentModel.find({postId:doc._id});
        postsList.push({post:doc , comment})
      }
    return res.json({message:"Success", postsList}) 




    // child to parent الطريقة الاولى
    // const getPosts= await postModel.find({}).populate([{
    //     path:'userId' ,
    //     select: 'username'
    //     },{
    //         path:'like' ,
    //         select: 'username'
    //     },{
    //         path:'unlike' ,
    //         select: 'username'
    //     }
    // ]);

 
    // const postsList=[]; // post with comments
    // for(const post of getPosts){
    //     // return res.json(post.title) // -> post title
    //     const comment= await commentModel.find({postId:post._id});
    //     postsList.push({post, comment})
    // }
    // return res.json({message:"Success", postsList}) 
})
 





// export const notIn =asyncHandler(async (req, res, next)=>{
//     const postId=req.params;
//     const post = await postModel.findOne({_id:postId });
//     return res.json(post)
// })

export const createPost= asyncHandler  (async (req, res, next)=>{
/**
 * 
 *  title  -> req.body
    caption -> req.body
    userId: req.id
    image:  from path
    like: 
    unluke: 
 */
   const {title,caption}=req.body;
   const id = req.id ;


        const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:'voteUp/post'})
        
        const post = await postModel.create({title,caption,userId:id,image:{public_id,secure_url}});
        return res.json({post})


// return res.status(201).json({messsage: 'success ' , post})
});

export const like = asyncHandler (async (req, res, next)=>{
    const userId = req.id ;
    const {id}= req.params ; // post id

console.log(userId,id)

    const post = await postModel.findByIdAndUpdate(id,
     
        {
               $addToSet:{like:userId}, // add onece like to array 
               $pull:{unlike:userId}//delete userId if it in unlike array
            // $addToSet:{like:userId} // add justOnece   to array
        },{new:true})
    post.totalVote = post.like.length - post.unlike.length ;
    await post.save() ;
return res.json({message: 'sucsess', post})
});

export const unlike = asyncHandler (async (req, res, next)=>{
  const userId = req.id ;
  const {id}= req.params ; // post id

console.log(userId,id)

  const post = await postModel.findByIdAndUpdate(id,
   
      {
             $addToSet:{unlike:userId}, // add many to array 
             $pull:{like:userId} //delete userid if it in like array
          // $addToSet:{like:userId} // add justOnece   to array
      },{new:true})
      post.totalVote = post.like.length - post.unlike.length ;
      await post.save() ;
return res.json({message: 'sucsess', post})
});