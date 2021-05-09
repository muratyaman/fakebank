import { randAccount, randUser, financeAmount, pastDateStr, sentence, randUuid } from './rand';
import { IAccount, ITransfer, IUser} from './types';

export function newTransfer(users: IUser[], accounts: IAccount[]): ITransfer {
  const user = randUser(users);
  const fromAccount = randAccount(accounts);
  const toAccount = randAccount(accounts, fromAccount.currencyCode);
  return {
    id: randUuid(),
    ts: pastDateStr(),
    date: pastDateStr(),
    userId: user.id,
    fromAccountId: fromAccount.id,
    toAccountId: toAccount.id,
    description: sentence(5),
    amount: financeAmount(),
    currencyCode: fromAccount.currencyCode, // TODO: should be same as toAccount.currencyCode
  }
}
