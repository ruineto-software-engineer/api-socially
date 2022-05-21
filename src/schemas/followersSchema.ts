import joi from "joi";
import { followers } from "@prisma/client";

type CreateFollowersData = Omit<followers, "id">;

const followersSchema = joi.object<CreateFollowersData>({
  followerId: joi.number().required(),
  followsId: joi.number().required(),
});

export default followersSchema;
