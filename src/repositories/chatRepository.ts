import { prisma } from '../database.js';

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