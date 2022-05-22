import { Request, Response } from 'express';
import * as chatService from '../services/chatService.js';

export async function getAllContacts(req: Request, res: Response) {
	const userId: number = parseInt(req.params.userId);

	const contacts = await chatService.getAllContacts(userId);

	res.status(200).send(contacts);
}

export async function getContactsByName(req: Request, res: Response) {
  const userId: number = parseInt(req.params.userId);
  const userName: string = req.query.userName.toString();

  const contactsByName = await chatService.getContactsByName(userId, userName);

	res.status(200).send(contactsByName);
}