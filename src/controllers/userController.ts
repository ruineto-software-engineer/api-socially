import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export async function register(req: Request, res: Response) {
	const registerData = req.body;

	await userService.create(registerData);

	res.sendStatus(201);
}

export async function getUserById(req: Request, res: Response) {
	const userId: number = parseInt(req.params.userId);

	const user = await userService.getUserById(userId);

	res.status(200).send(user);
}

export async function getMetricsById(req: Request, res: Response) {
	const userId: number = parseInt(req.params.userId);

	const metrics = await userService.getMetricsById(userId);

	res.status(200).send(metrics);
}

export async function getPostsById(req: Request, res: Response) {
	const userId: number = parseInt(req.params.userId);

	const posts = await userService.getPostsById(userId);

	res.status(200).send(posts);
}

export async function getUsersByName(req: Request, res: Response) {
	const userName: string = req.params.userName;

	const users = await userService.getUsersByName(userName);

	res.status(200).send(users);
}

export async function followUser(req: Request, res: Response) {
	const followData = req.body;

	await userService.followUser(followData.followerId, followData.followsId);

	res.sendStatus(200);
}

export async function unfollowUser(req: Request, res: Response) {
	const unfollowData = req.body;

	await userService.unfollowUser(unfollowData.followerId, unfollowData.followsId);

	res.sendStatus(200);
}

export async function getFollowsStatus(req: Request, res: Response) {
	const followData = req.query.find;

	const followerId = parseInt(
		followData.toString().split(",")[0]
		.replace(`"`, "")
		.replace(`"`, "")
		.replace(`{`, "")
		.replace(`followerId:`, "")
	);
	const followsId = parseInt(		
		followData.toString().split(",")[1]
		.replace(`"`, "")
		.replace(`"`, "")
		.replace(`}`, "")
		.replace(`followsId:`, "")
	);

 	const followsStatus = await userService.getFollowsStatus(followerId, followsId);

	res.status(200).send(followsStatus);
}