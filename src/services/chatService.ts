import * as errorsUtils from '../utils/errorsUtils.js';
import * as chatUtils from "../utils/chatUtils.js";
import * as feedRepository from '../repositories/feedRepository.js';
import * as userRepository from "../repositories/userRepository.js";
import * as chatRepository from '../repositories/chatRepository.js';

export async function getAllContacts(userId: number) {
  if(!userId) throw errorsUtils.badRequestError('User id is Required');

  const user = await userRepository.findById(userId);
  if(!user) throw errorsUtils.notFoundError("User");

	const follows = await feedRepository.getAllFollows(userId);
  const followsReader = follows.map((follow) => follow.followsId);

  const contacts = await chatRepository.getAllContacts(followsReader);

  return contacts;
}

export async function getContactsByName(userId: number, userName: string) {
  if(!userId) throw errorsUtils.badRequestError('User id is Required');
  if(!userName) throw errorsUtils.badRequestError('User name is Required');

  const user = await userRepository.findById(userId);
  if(!user) throw errorsUtils.notFoundError("User");

  const follows = await feedRepository.getAllFollows(userId);
  const followsReader = follows.map((follow) => follow.followsId);

  const contacts = await chatRepository.getAllContacts(followsReader);
  const contactsReader = contacts.map((contact) => contact.name);
  const contactsLowerReader = contacts.map((contact) => contact.name.toLowerCase());

  const isContact = chatUtils.isContact(userName, contactsLowerReader);
  if(!isContact) throw errorsUtils.notFoundError("User not followed");

  const contactsByName = await userRepository.findByName(userName);
  if(!contactsByName) throw errorsUtils.notFoundError("User");

  const filterContats = chatUtils.filterContats(contactsByName, contactsReader);

  return filterContats;
}