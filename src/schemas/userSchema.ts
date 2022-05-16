import joi from 'joi';
import { User } from '@prisma/client';

type CreateUserData = Omit<User, "id">;

const userSchema = joi.object<CreateUserData>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required()
});

export default userSchema;