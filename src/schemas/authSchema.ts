import joi from "joi";
import { User } from "@prisma/client";

type CreateAuthData = Omit<Omit<User, "id">, "name">;

const authSchema = joi.object<CreateAuthData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default authSchema;
