import { Router } from "express";
import * as postsController from "../controllers/postsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const postsRouter = Router();

postsRouter.post("/posts", validateTokenMiddleware, validateSchemaMiddleware, postsController.create);

export default postsRouter;