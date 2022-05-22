import * as errorsUtils from '../utils/errorsUtils.js';
import * as feedRepository from '../repositories/feedRepository.js';
import * as userRepository from "../repositories/userRepository.js";

export async function getAllPosts(userId: number) {
  if(!userId) throw errorsUtils.badRequestError('User id is Required');

  const user = await userRepository.findById(userId);
  if(!user) throw errorsUtils.notFoundError("User");

	const follows = await feedRepository.getAllFollows(userId);
  const followsReader = follows.map((follow) => follow.followsId);

  const posts = await feedRepository.getAllPosts(followsReader);

  return posts;
}