import { IAmountType, ICurrency } from './types';

export const currencyCodes: ICurrency[] = [
  { code: 'GBP', name: 'British Pounds' },
  { code: 'EUR', name: 'Euro' },
  { code: 'USD', name: 'US Dollars', },
];

export const amountTypes: IAmountType[] = [
  { code: 'C', name: 'Credit', value: +1 },
  { code: 'D', name: 'Debit', value: -1 },
];
