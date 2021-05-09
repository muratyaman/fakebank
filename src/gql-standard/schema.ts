// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
import { gql } from 'apollo-server';
import { AuthAPI } from '../common/AuthAPI';
import { AccountsAPI } from '../common/AccountsAPI';
import { PaymentsAPI } from '../common/PaymentsAPI';
import { IObject } from '../common/types';

export const typeDefs = gql`
  
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
  }
  
  type Account {
    id: ID!
    userId: String!
    accountNumber: String!
    accountName: String!
    balance: String!
    currencyCode: String!
  }
  
  type Transfer {
    id: ID!
    date: String!
    userId: String!
    fromAccountId: String!
    toAccountId: String!
    amount: Float
    currencyCode: String!
  }

  type Query {
    user (id: ID!): User
    users: [ User ]
    accounts: [ Account ]
    transfers: [ Transfer ]
  }
`;

interface IContextWithDataSources {
  dataSources: {
    authAPI: AuthAPI,
    accountsAPI: AccountsAPI,
    paymentsAPI: PaymentsAPI,
  };
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers: IObject = {
  Query: {
    //parent, args, ctx, info
    user: async (parent: any, args: any, ctx: IContextWithDataSources) => {
      return ctx.dataSources.authAPI.getUserByIdFast(args.id);
    },
    users: async (parent: any, args: any, ctx: IContextWithDataSources) => {
      return ctx.dataSources.authAPI.getUsers(args);
    },
    //parent, args, ctx, info
    accounts: async (parent: any, args: any, ctx: IContextWithDataSources) => {
      return ctx.dataSources.accountsAPI.getAccounts(args);
    },
    //parent, args, ctx, info
    transfers: async (parent: any, args: any, ctx: IContextWithDataSources) => {
      return ctx.dataSources.paymentsAPI.getTransfers(args);
    },
  },

};
