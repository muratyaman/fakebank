import * as filters from '../common/filters';
import * as rand from '../common/rand';
import { IUser } from '../common/types';
import { newUser } from '../common/users';

interface ISaveUserInput {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

function saveUser(users: IUser[], input: ISaveUserInput) {
  const { firstName, lastName, username, password } = input;
  const user = {
    id: rand.randUuid(),
    firstName,
    lastName,
    username,
    password, // TODO: hash?
  };
  users.push(user);
  return Promise.resolve(user);
}

interface ILoginInput {
  username: string;
  password: string;
}

function login(users: IUser[], input: ILoginInput) {
  let data = null, error = null;
  const { username, password } = input;
  const user = users.find(u => u.username === username);
  if (user && user.password === password) {
    data = user; // ok
  } else {
    error = 'invalid credentials';
  }
  return { data, error };
}

export async function init() {
  const userCount = rand.randNum(100, 1000);
  const users: IUser[] = Array.from({ length: userCount }, () => newUser());

  return Promise.resolve({
    users: async ({ ids = '', offset = 0, limit = 0 }) => {
      return filters.filterRowsByIdsAndPaginate(
        [...users],
        { ids, offset, limit }
      );
    },
    saveUser: async (input: any) => await saveUser(users, input),
    login: async (input: any) => await login(users, input),
  });
}
