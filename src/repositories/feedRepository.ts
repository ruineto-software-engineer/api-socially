import { prisma } from '../database.js';

export async function getAllFollows(userId: number) {
	const follows = await prisma.followers.findMany({
    select: {
      followsId: true
    },
    where: {
      followerId: userId
    }
  });

  return follows;
}

export async function getAllPosts(followsReader: number[]) {
  let postsArr = [];
  for (let i = 0; i < followsReader.length; i++) {
    const follow = followsReader[i];
    const posts = await prisma.post.findMany({ 
      include:{
        user: {
          select: {
            name: true
          }
        }
      },
      where: {
        userId: follow
      }
    });

    postsArr.push(...posts);
  }

  return postsArr;
}