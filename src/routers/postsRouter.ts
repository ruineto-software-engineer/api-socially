import { Router } from "express";
import * as postsController from "../controllers/postsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const postsRouter = Router();

postsRouter.use(validateTokenMiddleware);

postsRouter.get("/posts", postsController.getAllPosts);
postsRouter.post("/posts", validateSchemaMiddleware, postsController.create);

export default postsRouter;