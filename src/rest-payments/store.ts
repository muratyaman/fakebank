import axios from 'axios';
import * as filters from '../common/filters';
import * as rand from '../common/rand';
import { IAccount, ITransfer } from '../common/types';
import { newTransfer } from '../common/payments';

async function getUsers() {
  return axios.get('http://localhost:10111/api/users');
}

async function getAccounts() {
  return axios.get('http://localhost:10222/api/accounts');
}

interface ISaveTransferInput {
  userId: string;
  fromAccountId: string;
  toAccountId: string;
  date: string;
  amount: number;
  currencyCode: string;
  description: string;
}

async function saveTransfer(transfers: ITransfer[], accounts: IAccount[], input: ISaveTransferInput) {
  // TODO: validate
  const { userId, fromAccountId, toAccountId, date, amount, currencyCode, description } = input;

  const fromAccount = accounts.find(a => a.id === fromAccountId);
  if (!fromAccount) throw new Error('Account not found');

  const toAccount = accounts.find(a => a.id === toAccountId);
  if (!toAccount) throw new Error('Account not found');

  const transfer = {
    id: rand.randUuid(),
    ts: new Date().toISOString(),
    date,
    userId,
    fromAccountId,
    toAccountId,
    description,
    amount,
    currencyCode, // TODO: should be same as toAccount.currencyCode
  };
  transfers.push(transfer);

  // TODO: create debit transaction using fromAccountId
  // TODO: create credit transaction using toAccountId

  return transfer;
}

export async function init() {
  const response1 = await getUsers();
  const { data: users } = response1.data; // read body

  const response2 = await getAccounts();
  const { data: accounts } = response2.data; // read body

  const transCount = rand.randNum(100, 1000);
  const transfers = Array.from({ length: transCount }, () => newTransfer(users, accounts));

  return Promise.resolve({
    transfers: async ({ ids = '', userId = '', offset = 0, limit = 0 }) => {
      return filters.filterRowsByIdsAndPaginate(
        [...transfers],
        { ids, offset, limit },
        (row: ITransfer ) => {
          let match: boolean = true;
          if (userId && userId !== '') match = row.userId === userId;
          return match;
        }
      );
    },
    saveTransfer: async (input: any) => saveTransfer(transfers, accounts, input),
  })
}
