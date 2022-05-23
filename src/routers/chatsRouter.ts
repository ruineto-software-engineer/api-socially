import { Router } from "express";
import * as chatsController from "../controllers/chatsController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const chatsRouter = Router();

chatsRouter.use(validateTokenMiddleware);

chatsRouter.get('/chats/:userId', chatsController.getAllContacts);
chatsRouter.get('/chats/search/:userId', chatsController.getContactsByName);
chatsRouter.get('/chat/status/:userId', chatsController.getStatusById);
chatsRouter.post('/chat/send', validateSchemaMiddleware,chatsController.sendMessage);
chatsRouter.get('/chat/messages/:recipientId', chatsController.getMessages);

export default chatsRouter;