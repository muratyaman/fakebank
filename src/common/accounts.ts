import faker from 'faker';
import { IAccount, IUser } from './types';
import { randUser, financeAmount, randAmountType, randCurrencyCode, randFirstName, randLastName, sentence } from './rand';

export function newAccount(users: IUser[]): IAccount {
  const user = randUser(users);
  return {
    id: faker.random.uuid(),
    userId: user.id,
    accountNumber: faker.finance.account(), // TODO: should be unique
    accountName: randFirstName() + ' ' + randLastName(),
    accountType: faker.finance.accountName(),
    description: sentence(5),
    balance: financeAmount(),
    amountTypeCode: randAmountType().code, // TODO: add type 'C' for credit or 'D' for debit
    currencyCode: randCurrencyCode().code,
    iban: faker.finance.iban(),
    bic: faker.finance.bic(),
  }
}
