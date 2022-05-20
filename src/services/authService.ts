import { User } from "@prisma/client";
import * as authRepository from "../repositories/authRepository.js";
import * as errorsUtils from "../utils/errorsUtils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type CreateLoginData = Omit<User, "id">;

export async function create(loginData: CreateLoginData) {
  const secretKey = process.env.JWT_SECRET;
  const configuration = { expiresIn: 60 * 60 };

  const user = await authRepository.findByEmail(loginData);
  if (!user) throw errorsUtils.unauthorizedError("Credentials");

  const isAuthorized = bcrypt.compareSync(loginData.password, user.password);
  if (isAuthorized) {
    const token = jwt.sign(loginData, secretKey, configuration);

    await authRepository.createSession(token, user.id);

    return { token, userId: user.id, email: user.email, name: user.name };
  }

  throw errorsUtils.unauthorizedError("Credentials");
}

export async function remove(userId: number) {
  const user = await authRepository.findById(userId);
  if (!user) throw errorsUtils.notFoundError("User");

  const session = await authRepository.findSessionById(userId);
  if (!session) throw errorsUtils.badRequestError("Session");

  await authRepository.removeSession(session.token);
}
