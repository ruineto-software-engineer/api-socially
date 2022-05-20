import joi from "joi";
import { Post } from "@prisma/client";

type CreatePostData = Omit<Omit<Post, "id">, "createdAt">;

const postsSchema = joi.object<CreatePostData>({
  userId: joi.number().required(),
  url: joi.string().uri().required(),
  description: joi.string().required(),
});

export default postsSchema;
