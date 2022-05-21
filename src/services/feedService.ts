import * as errorsUtils from '../utils/errorsUtils.js';
import * as feedRepository from '../repositories/feedRepository.js';

export async function getAllPosts(userId: number) {
  if(!userId) throw errorsUtils.badRequestError('User Id');

	const follows = await feedRepository.getAllFollows(userId);
  const followsReader = follows.map((follow) => follow.followsId);

  const posts = await feedRepository.getAllPosts(followsReader);

  return posts;
}