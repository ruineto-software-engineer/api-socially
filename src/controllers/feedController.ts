import { Request, Response } from 'express';
import * as feedService from '../services/feedService.js';

export async function getAllPosts(req: Request, res: Response) {
	const userId: number = parseInt(req.params.userId);

	const posts = await feedService.getAllPosts(userId);

	res.status(200).send(posts);
}