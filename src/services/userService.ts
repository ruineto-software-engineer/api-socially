import { User } from '@prisma/client';
import * as errorsUtils from '../utils/errorsUtils.js';
import * as userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';

export type CreateUserData = Omit<User, 'id'>;

export async function create(registerData: CreateUserData) {
	const user = await userRepository.findByEmail(registerData.email);
	if (user) throw errorsUtils.conflictError('User');

	const passwordHash = bcrypt.hashSync(registerData.password, 12);
	const userData = { ...registerData, password: passwordHash };

	userRepository.create(userData);
}

export async function getUserById(userId: number) {
	if(!userId) throw errorsUtils.badRequestError('User Id');

	const user = await userRepository.findById(userId);
	if(!user) throw errorsUtils.notFoundError('User');

	return user;
}

export async function getMetricsById(userId: number) {
	if(!userId) throw errorsUtils.badRequestError('User Id');

	const user = await userRepository.findById(userId);
	if(!user) throw errorsUtils.notFoundError('User');

	const posts = await userRepository.getPostsCountById(userId);
	const followers = await userRepository.getFollowersById(userId);
	const follows = await userRepository.getFollowsById(userId);

	const metrics = {
		posts,
		followers,
		follows
	}

	return metrics;
}

export async function getPostsById(userId: number) {
	if(!userId) throw errorsUtils.badRequestError('User Id');

	const user = await userRepository.findById(userId);
	if(!user) throw errorsUtils.notFoundError('User');

	const posts = await userRepository.getPostsById(userId);

	return posts;
}

export async function getUsersByName(userName: string) {
	if(!userName) throw errorsUtils.badRequestError('User Name');

	const users = await userRepository.findByName(userName);
	if(!users.length) throw errorsUtils.notFoundError('User');

	return users;
}