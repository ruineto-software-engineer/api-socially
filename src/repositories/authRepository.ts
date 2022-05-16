import { prisma } from "../database.js";
import { User } from "@prisma/client";

type LoginUserData = Omit<Omit<User, "id">, "name">;

export async function findByEmail(loginData: LoginUserData) {
  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
  });

  return user;
}

export async function findById(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return user;
}

export async function createSession(token: string, userId: number) {
  await prisma.sessions.create({ data: { token, userId } });
}

export async function findSessionById(userId: number) {
  const session = await prisma.sessions.findFirst({
    where: { userId: userId },
  });

  return session;
}

export async function removeSession(token: string) {
  await prisma.sessions.delete({ where: { token: token } });
}
