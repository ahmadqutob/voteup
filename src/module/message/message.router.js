import { Router } from "express";
import  * as messageController from './controller/message.cotroller.js'
import auth from "../../middleware/auth.middleware.js";
const router =Router();

router.get('/getMessage',messageController.getMessage)
router.post('/sendMessage/:reciverId',auth,messageController.sendMessage)
router.delete('/deleteMessage/:messageId',auth,messageController.deleteMessage)
 


export default router