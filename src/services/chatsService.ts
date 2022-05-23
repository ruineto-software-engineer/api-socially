import * as errorsUtils from '../utils/errorsUtils.js';
import * as chatUtils from "../utils/chatsUtils.js";
import * as feedRepository from '../repositories/feedRepository.js';
import * as userRepository from "../repositories/userRepository.js";
import * as chatsRepository from '../repositories/chatsRepository.js';

export async function getAllContacts(userId: number) {
  if(!userId) throw errorsUtils.badRequestError('User id is Required');

  const user = await userRepository.findById(userId);
  if(!user) throw errorsUtils.notFoundError("User");

	const follows = await feedRepository.getAllFollows(userId);
  const followsReader = follows.map((follow) => follow.followsId);

  const contacts = await chatsRepository.getAllContacts(followsReader);

  return contacts;
}

export async function getContactsByName(userId: number, userName: string) {
  if(!userId) throw errorsUtils.badRequestError('User id is Required');
  if(!userName) throw errorsUtils.badRequestError('User name is Required');

  const user = await userRepository.findById(userId);
  if(!user) throw errorsUtils.notFoundError("User");

  const follows = await feedRepository.getAllFollows(userId);
  const followsReader = follows.map((follow) => follow.followsId);

  const contacts = await chatsRepository.getAllContacts(followsReader);
  const contactsReader = contacts.map((contact) => contact.name);
  const contactsLowerReader = contacts.map((contact) => contact.name.toLowerCase());

  const isContact = chatUtils.isContact(userName, contactsLowerReader);
  if(!isContact) throw errorsUtils.notFoundError("User not followed");

  const contactsByName = await userRepository.findByName(userName);
  if(!contactsByName) throw errorsUtils.notFoundError("User");

  const filterContats = chatUtils.filterContats(contactsByName, contactsReader);

  return filterContats;
}

export async function getStatusById(userId: number) {
  if(!userId) throw errorsUtils.badRequestError('User id is Required');

  const user = await userRepository.findById(userId);
  if(!user) throw errorsUtils.notFoundError("User");

  const statusById = await chatsRepository.getStatusById(userId);

  return statusById;
}

export async function sendMessage(messageData: chatsRepository.CreateMessageData) {
  if(!messageData) throw errorsUtils.badRequestError('messageData is Required');

  await chatsRepository.sendMessage(messageData);
}

export async function getMessages(senderName: string, recipientId: number) {
  if(!senderName) throw errorsUtils.badRequestError('Sender name is Required');
  if(!recipientId) throw errorsUtils.badRequestError('Recipient id is Required');

  const sender = await chatsRepository.findByName(senderName);
  if(!sender) throw errorsUtils.notFoundError("Sender");

  const recipient = await userRepository.findById(recipientId);
  if(!recipient) throw errorsUtils.notFoundError("Recipient");

  const messages = await chatsRepository.getMessages(sender.id, recipientId);

  return messages;
}