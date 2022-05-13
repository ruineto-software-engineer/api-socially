import { Router } from "express";
import e2eTestsRouter from "./e2eTestsRouter.js";

const router = Router();

if (process.env.NODE_ENV === "test") router.use(e2eTestsRouter);

export default router;
