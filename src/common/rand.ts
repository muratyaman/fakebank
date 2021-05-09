import faker from 'faker';
import { amountTypes, currencyCodes } from './constants';
import { IAccount, IAmountType, ICurrency, IUser } from './types';

export function randNum(min = 0, max = 987654321) {
  return faker.random.number({ min, max })
}

export function randCurrencyCode(): ICurrency {
  const idx: number = randNum(0, currencyCodes.length - 1);
  return currencyCodes[idx];
}

export function randAmountType(): IAmountType {
  const idx: number = randNum(0, amountTypes.length - 1);
  return amountTypes[idx];
}

export function randAccount(accounts: IAccount[], currencyCode: string = ''): IAccount {
  let idx;
  if (currencyCode) {
    const accountsFiltered = accounts.filter((ac: IAccount) => ac.currencyCode === currencyCode);
    idx = randNum(0, accountsFiltered.length - 1);
    return accountsFiltered[idx];
  } else {
    idx = randNum(0, accounts.length - 1);
    return accounts[idx];
  }
}

export function randUser(users: IUser[]): IUser {
  let idx: number = randNum(0, users.length - 1);
  return users[idx];
}

export function randStr(length = 10) {
  return faker.random.alphaNumeric(length);
}

export function randUuid(): string {
  return faker.random.uuid();
}

export function pastDate(): Date {
  return faker.date.past();
}

export function pastDateStr(): string {
  return faker.date.past().toISOString();
}

export function sentence(wordCount = 5): string {
  return faker.lorem.sentence(wordCount);
}

export function financeAmount() {
  return Number(faker.finance.amount());
}

export function randFirstName(): string {
  return faker.name.firstName();
}

export function randLastName(): string {
  return faker.name.lastName();
}

export function randUsername(): string {
  return faker.name.firstName().toLowerCase() + randNum(12345, 98765);
}
