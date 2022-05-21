import { Router } from "express";
import * as userController from "../controllers/userController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const userRouter = Router();

userRouter.post('/sign-up', validateSchemaMiddleware, userController.register);
userRouter.get('/users/:userId', validateTokenMiddleware, userController.getUserById);
userRouter.get('/users/search/:userName', validateTokenMiddleware, userController.getUsersByName);
userRouter.get('/metrics/:userId', validateTokenMiddleware, userController.getMetricsById);
userRouter.get('/posts/:userId', validateTokenMiddleware, userController.getPostsById);
userRouter.post('/follow', validateTokenMiddleware, validateSchemaMiddleware, userController.followUser);
userRouter.post('/unfollow', validateTokenMiddleware, validateSchemaMiddleware, userController.unfollowUser);
userRouter.get('/follow/status', validateTokenMiddleware, userController.getFollowsStatus);

export default userRouter;