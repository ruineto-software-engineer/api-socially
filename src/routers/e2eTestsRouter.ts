import { Router } from "express";
import e2eTestsController from "../controllers/e2eTestsController.js";

const e2eTestsRouter = Router();

e2eTestsRouter.delete("/e2eTests/reset", e2eTestsController.reset);

export default e2eTestsRouter;
