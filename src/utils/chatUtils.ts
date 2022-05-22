import { User } from "@prisma/client";

type FilteredUserData = Omit<User, 'password'>;

export function isContact(userName: string, contactsReader: string[]) {
  for (let i = 0; i < contactsReader.length; i++) {
    const contact = contactsReader[i];
    if(contact.includes(userName)) return true;
  }

  return false;
}

export function filterContats(contactsByName: FilteredUserData[], contactsReader: string[]) {
  const hashtable = {};
  for(let i = 0; i < contactsReader.length; i++){
    const contact = contactsReader[i];

    hashtable[contact] = true;
  }

  const filteredContacts: FilteredUserData[] = [];
  for (let i = 0; i < contactsByName.length; i++) {
    const contact = contactsByName[i];

    if(hashtable[contact.name]) filteredContacts.push(contact);
  }

  return filteredContacts;
}