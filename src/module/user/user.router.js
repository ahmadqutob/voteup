import { Router } from "express";
import * as userController from './controller/user.controller.js'
import auth from  '../../middleware/auth.middleware.js'
// import fileUpload, { HME, fileValidation } from "../../services/multer.services.js";
 import fileUpload, { HME, fileValidation } from "../../services/cloudinary.js";
import validation from "../../middleware/validation.middleware.js";
import { profilePicVal } from "./user.validation.js";
 import * as validators from './user.validation.js'

const router = new Router();

router.get('/profile',auth,userController.profile)

 

// router.post('/post',auth,fileUpload(va),userController.post)
 
export default router
 