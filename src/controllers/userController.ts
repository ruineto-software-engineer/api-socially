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