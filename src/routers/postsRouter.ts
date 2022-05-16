import { Router } from "express";
import * as postsController from "../controllers/postsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const postsRouter = Router();

postsRouter.use(validateTokenMiddleware);

postsRouter.get("/posts", postsController.getAllPosts);

export default postsRouter;