import { Router } from "express"
import * as postContriller from './controller/post.controller.js'
import auth from "../../middleware/auth.middleware.js";
import fileUpload, { fileValidation } from "../../services/cloudinary.js";
import  * as commentController from './controller/Comment.controller.js'
const router  = Router();

// router.get('/hi',postContriller.getPost);
router.get('/',postContriller.getPost)
router.post('/post',auth,fileUpload(fileValidation.image).single('image'),postContriller.createPost);
router.patch('/:id/Likepost',auth,postContriller.like)
router.patch('/:id/unlike',auth,postContriller.unlike)
router.post('/:id/comment',auth,fileUpload(fileValidation.image).single('image'),commentController.addCommaent)
// router.get('/:postId/nin',postContriller.notIn);
export default router;