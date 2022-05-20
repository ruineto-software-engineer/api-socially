import * as errorsUtils from "../utils/errorsUtils.js";
import * as postsRepository from "../repositories/postsRepository.js";

export async function create(postData: postsRepository.CreatePostData) {
  if(!postData) throw errorsUtils.badRequestError('');

  await postsRepository.createPost(postData);
}