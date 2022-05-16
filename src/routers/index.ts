import { Router } from "express";
import authRouter from "./authRouter.js";
import e2eTestsRouter from "./e2eTestsRouter.js";
import postsRouter from "./postsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(postsRouter);
if (process.env.NODE_ENV === "test") router.use(e2eTestsRouter);

export default router;
