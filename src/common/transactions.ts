import { financeAmount, randAccount, randUser, randAmountType, randUuid, pastDateStr, sentence } from './rand';
import { IAccount, ITransaction, IUser} from "./types";

export function newTransaction(accounts: IAccount[], users: IUser[]): ITransaction {
  const user = randUser(users);
  const account = randAccount(accounts);
  //const refAccount = randAccount(accounts, account.currencyCode); // should be same as toAccount.currencyCode
  const amountType = randAmountType();
  const amount = financeAmount();
  return {
    id: randUuid(),
    ts: pastDateStr(),
    date: pastDateStr(),
    userId: user.id, // TODO: use fromAccount.userId or a user with permission
    accountId: account.id,
    transferId: randUuid(), // refAccount.accountNumber,
    description: sentence(5),
    amount: Number(amount),
    amountTypeCode: amountType.code,
    currencyCode: account.currencyCode,
    newBalance: Math.abs(account.balance + Number(amount) * amountType.value),
  };
}
