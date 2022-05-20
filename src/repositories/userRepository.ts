import { prisma } from '../database.js';
import { User } from '@prisma/client';

type CreateUserData = Omit<User, 'id'>;

export async function create(userData: CreateUserData) {
	await prisma.user.create({ data: userData });
}

export async function findByEmail(email: string) {
	const user = await prisma.user.findUnique({ where: { email } });

	return user;
}

export async function findById(id: number) {
	const user = await prisma.user.findUnique({
		select: {
			id: true,
			name: true,
			email: true
		}, 
		where: { id } 
	});

	return user;
}

export async function getPostsById(userId: number) {
	const posts = await prisma.post.findMany({ 
		include: {
			user: {
				select: {
					name: true
				}
			}
		},
		where: { userId },
		orderBy: {
			createdAt: 'desc'
		}
	});

	return posts;
}

export async function getPostsCountById(userId: number) {
	const posts = await prisma.post.count({ where: { userId } });

	return posts;
}

export async function getFollowersById(userId: number) {
	const followers = await prisma.followers.count({ where: { followsId: userId } });

	return followers;
}

export async function getFollowsById(userId: number) {
	const follows = await prisma.followers.count({ where: { followerId: userId } });

	return follows;
}