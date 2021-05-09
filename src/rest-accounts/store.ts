import axios from 'axios';
import { currencyCodes, amountTypes } from '../common/constants';
import { filterRowsByIdsAndPaginate } from '../common/filters';
import * as rand from '../common/rand';
import { IAccount, IAmountType, ITransaction } from '../common/types';
import { newAccount } from '../common/accounts';
import { newTransaction } from '../common/transactions';

async function getUsers() {
  return axios.get('http://localhost:10111/api/users');
}

// TODO: define input
function saveTransaction(transactions: ITransaction[], accounts: IAccount[], input: any) {
  const { date, userId, accountId, transferId, description, amount, amountTypeCode, currencyCode } = input;
  // TODO: validations
  const account = accounts.find(a => a.id === accountId);
  if (!account) throw new Error('Account not found');

  const amountTypeOfAccount = amountTypes.find((r: IAmountType) => r.code === account.amountTypeCode);
  if (!amountTypeOfAccount) throw new Error('Amount type not found');

  // TODO: account.currencyCode === currencyCode
  //const refAccount = accounts.find(a => a.id === refAccountId);
  // TODO: account.currencyCode === refAccount.currencyCode
  const amountType = amountTypes.find((r: IAmountType) => r.code === amountTypeCode);
  if (!amountType) throw new Error('Amount type not found');

  // TODO: update account
  account.balance = Math.abs(account.balance * amountTypeOfAccount.value + amount * amountType.value);

  const transaction: ITransaction = {
    id: rand.randUuid(),
    ts: new Date().toISOString(),
    date,
    userId,
    accountId,
    transferId,
    description,
    amount,
    amountTypeCode: amountType.code,
    currencyCode,
    newBalance: account.balance,
  };

  transactions.push(transaction);
  return transaction;
}

export async function init() {

  const response = await getUsers();
  const { data: users } = response.data; // ready body

  const accountCount = rand.randNum(100, 1000);
  const accounts: IAccount[] = Array.from({ length: accountCount }, () => newAccount(users));

  const transCount = rand.randNum(100, 1000);
  const transactions: ITransaction[] = Array.from({ length: transCount }, () => newTransaction(accounts, users));

  return Promise.resolve({
    currencyCodes,
    accounts: async ({ ids = '', userId = '', offset = 0, limit = 0 }) => {
      return filterRowsByIdsAndPaginate(
        [...accounts],
        { ids, offset, limit },
        (row: IAccount) => {
          let match: boolean = true;
          if (userId && userId !== '') match = match && row.userId === userId;
          return match;
        }
      );
    },
    transactions: async ({ ids = '', userId = '', accountId = '', offset = 0, limit = 0 }) => {
      return filterRowsByIdsAndPaginate(
        [...transactions],
        { ids, offset, limit },
        (row: ITransaction) => {
          let match: boolean = true;
          if (userId && userId !== '') match = match && row.userId === userId;
          if (accountId && accountId !== '') match = match && row.accountId === accountId;
          return match;
        }
      );
    },
    saveTransaction: async (input: any) => saveTransaction(transactions, accounts, input),
  })
}
