import { Router } from "express";
import * as feedController from "../controllers/feedController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const feedRouter = Router();

feedRouter.get('/feed/:userId', validateTokenMiddleware, feedController.getAllPosts);

export default feedRouter;