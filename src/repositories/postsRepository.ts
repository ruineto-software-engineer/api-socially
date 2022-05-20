import { prisma } from "../database.js";
import { Post } from "@prisma/client";

export type CreatePostData = Omit<Omit<Post, "id">, "createdAt">;

export async function createPost(postData: CreatePostData) {
  await prisma.post.create({
    data: { ...postData },
  });
}