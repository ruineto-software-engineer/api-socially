import { Request, Response } from 'express';
import * as chatsService from '../services/chatsService.js';
import * as chatsRepository from "../repositories/chatsRepository.js";

export async function getAllContacts(req: Request, res: Response) {
	const userId: number = parseInt(req.params.userId);

	const contacts = await chatsService.getAllContacts(userId);

	res.status(200).send(contacts);
}

export async function getContactsByName(req: Request, res: Response) {
  const userId: number = parseInt(req.params.userId);
  const userName: string = req.query.userName.toString();

  const contactsByName = await chatsService.getContactsByName(userId, userName);

	res.status(200).send(contactsByName);
}

export async function getStatusById(req: Request, res: Response) {
	const userId: number = parseInt(req.params.userId);

	const statusById = await chatsService.getStatusById(userId);

	res.status(200).send(statusById);
}

export async function sendMessage(req: Request, res: Response) {
	const messageData: chatsRepository.CreateMessageData = req.body;

	await chatsService.sendMessage(messageData);

	res.sendStatus(201);
}

export async function getMessages(req: Request, res: Response) {
	const recipientId: number = parseInt(req.params.recipientId);
	const senderName: string = req.query.senderName.toString();

	const messages = await chatsService.getMessages(senderName, recipientId);

	res.status(200).send(messages);
}
