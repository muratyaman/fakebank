export interface IObject {
  [key: string]: any;
}

export interface IObjectWithId extends IObject {
  id: string;
}

export interface IObjectWithUserId extends IObject {
  userId: string;
}

export interface IObjectWithIdAndUserId extends IObjectWithId {
  userId: string;
}

export interface IObjectWithFromAccountId extends IObject {
  fromAccountId: string;
}

export interface IObjectWithToAccountId extends IObject {
  toAccountId: string;
}

export interface ICurrency {
  code: string;
  name: string;
}

export interface IAmountType {
  code: string;
  name: string;
  value: number;
}

export interface IUser extends IObjectWithId {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface IAccount extends IObjectWithIdAndUserId {
  accountNumber: string;
  accountName: string;
  accountType: string;
  description: string;
  balance: number;
  amountTypeCode: string;
  currencyCode: string;
  iban: string;
  bic: string;
}

export interface ITransaction extends IObjectWithIdAndUserId {
  ts: string;
  date: string;
  accountId: string;
  transferId: string;
  description: string;
  amount: number;
  amountTypeCode: string;
  currencyCode: string;
  newBalance: number;
}

export interface ITransfer {
  id: string;
  ts: string;
  date: string;
  userId: string;
  fromAccountId: string;
  toAccountId: string;
  description: string;
  amount: number;
  currencyCode: string;
}
