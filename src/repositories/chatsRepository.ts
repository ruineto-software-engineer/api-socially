import { prisma } from '../database.js';
import { chats } from "@prisma/client";

export type CreateMessageData = Omit<Omit<chats, "id">, "createdAt">;

export async function getAllContacts(followsReader: number[]) {
  let contactsArr = [];
  for (let i = 0; i < followsReader.length; i++) {
    const follow = followsReader[i];
    const contact = await prisma.user.findMany({ 
      select: {
        id: true,
        name: true,
      },
      where: {
        id: follow
      }
    });

    contactsArr.push(...contact);
  }

  return contactsArr;
}

export async function getStatusById(userId: number) {
  const statusById = await prisma.sessions.findFirst({ 
    where: {
      userId,
    }
  });

  return statusById;
}

export async function sendMessage(messageData: CreateMessageData) {
  await prisma.chats.create({ 
    data: {
      ...messageData
    }
  });
}

export async function getMessages(senderId: number, recipientId: number) {
  const sendMessages = await prisma.chats.findMany({
    where: {
      senderId: senderId,
      recipientId: recipientId
    }
  });

  const recipientMessages = await prisma.chats.findMany({
    where: {
      senderId: recipientId,
      recipientId: senderId
    }
  });

  const messages = [ ...sendMessages, ...recipientMessages ]

  const messagesSorted = messages.sort(function (a, b) {
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    
    return 0;
  });

  return messagesSorted;
}

export async function findByName(senderName: string) {
  const sender = await prisma.user.findFirst({
    select: {
      id: true,
      name: true
    },
    where: {
      name: senderName
    }
  });

  return sender;
}