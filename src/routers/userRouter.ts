import { Router } from "express";
import * as userController from "../controllers/userController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const userRouter = Router();

userRouter.post('/sign-up', validateSchemaMiddleware, userController.register);

export default userRouter;