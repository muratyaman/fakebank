import { IUser } from './types';
import { randFirstName, randLastName, randStr, randUsername, randUuid } from './rand';

export function newUser(): IUser {
  const firstName = randFirstName();
  return {
    id: randUuid(),
    firstName,
    lastName: randLastName(),
    username: randUsername(),
    password: randStr(10), // TODO: hash?
  }
}
