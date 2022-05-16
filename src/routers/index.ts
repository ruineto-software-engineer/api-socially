import { Router } from "express";
import e2eTestsRouter from "./e2eTestsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
if (process.env.NODE_ENV === "test") router.use(e2eTestsRouter);

export default router;
