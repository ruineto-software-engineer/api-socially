import { Router } from "express";
import * as chatController from "../controllers/chatController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const chatRouter = Router();

chatRouter.use(validateTokenMiddleware);

chatRouter.get('/chat/:userId', chatController.getAllContacts);
chatRouter.get('/chat/search/:userId', chatController.getContactsByName);

export default chatRouter;