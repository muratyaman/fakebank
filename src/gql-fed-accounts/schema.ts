import { gql } from 'apollo-server';
import { AccountsAPI } from '../common/AccountsAPI';
import { IObject, IObjectWithId } from '../common/types';

export const typeDefs = gql`
  
  type Account @key(fields: "id") {
    id: ID!
    userId: String!
    accountNumber: String!
    accountName: String!
    description: String
    amount: Float!
    amountTypeCode: String!
    currencyCode: String!
  }
  
  extend type User @key(fields: "id") {
    id: ID! @external
    accounts: [Account!]!
  }

  type Query {
    account(id: ID!): Account
    accounts(limit: Int): [Account]
  }

`;

interface IContextWithDataSources {
  dataSources: {
    accountsAPI: AccountsAPI,
  };
}

export const resolvers: IObject = {
  Query: {
    //parent, args, ctx, info
    account: async (parent: any, args: IObjectWithId, ctx: IContextWithDataSources, info: any) => {
      return ctx.dataSources.accountsAPI.getAccountByIdFast(args.id);
    },
    //parent, args, ctx, info
    accounts: async (parent: any, args: any, ctx: IContextWithDataSources, info: any) => {
      return ctx.dataSources.accountsAPI.getAccounts(args);
    },
  },
  Account: {
    //ref, args, ctx, info
    __resolveReference(ref: IObjectWithId, args: any, ctx: IContextWithDataSources){
      return ctx.dataSources.accountsAPI.getAccountByIdFast(ref.id);
    },
    //ref, args, ctx, info
    //user(account) {
    //  return { __typename: 'User', id: account.userId };
    //}
  },
  User: {
    accounts(user: IObjectWithId, args: any, ctx: IContextWithDataSources) {
      return ctx.dataSources.accountsAPI.getAccounts({ userId: user.id });
    }
  },
  //Transfer: {
  //  fromAccount(transfer, args: any, ctx: IContextWithDataSources){
  //    return ctx.dataSources.accountsAPI.getAccountByIdFast({ id: transfer.fromAccountId });
  //  },
  //  toAccount(transfer, args: any, ctx: IContextWithDataSources){
  //    return ctx.dataSources.accountsAPI.getAccountByIdFast({ id: transfer.toAccountId });
  //  },
  //}

};
