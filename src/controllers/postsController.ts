import { Request, Response } from 'express';
import * as postsService from "../services/postsService.js";
import * as postsRepository from "../repositories/postsRepository.js";

export async function create(req: Request, res: Response) {
  const post:postsRepository.CreatePostData = req.body;

  await postsService.create(post);

  res.sendStatus(201);
}