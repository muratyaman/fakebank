import { gql } from 'apollo-server';
import {
  IObject,
  IObjectWithFromAccountId,
  IObjectWithId,
  IObjectWithToAccountId,
  IObjectWithUserId,
} from '../common/types';
import { PaymentsAPI } from '../common/PaymentsAPI';

export const typeDefs = gql`

  type Transfer @key(fields: "id") {
    id: ID!
    userId: String!
    fromAccountId: String!
    toAccountId: String!
    description: String
    amount: Float!
    currencyCode: String!
  }
  
  type Query {
    transfer (id: ID!): Transfer
    transfers: [ Transfer ]
  }
  
`;

interface IContextWithDataSources {
  dataSources: {
    paymentsAPI: PaymentsAPI,
  };
}

export const resolvers: IObject = {
  Query: {
    //parent, args, ctx, info
    transfer: async (parent: any, args: IObjectWithId, ctx: IContextWithDataSources) => {
      return ctx.dataSources.paymentsAPI.getTransferById(args.id);
    },
    //parent, args, ctx, info
    transfers: async (parent: any, args: any, ctx: IContextWithDataSources) => {
      return ctx.dataSources.paymentsAPI.getTransfers(args);
    },
  },
  Transfer: {
    //ref, args, ctx, info
    __resolveReference(ref: IObjectWithId, args: any, ctx: IContextWithDataSources){
      return ctx.dataSources.paymentsAPI.getTransferByIdFast(ref.id);
    },
    user(transfer: IObjectWithUserId) {
      return { __typename: 'User', id: transfer.userId };
    },
    fromAccount(transfer: IObjectWithFromAccountId) {
      return { __typename: 'Account', id: transfer.fromAccountId };
    },
    toAccount(transfer: IObjectWithToAccountId) {
      return { __typename: 'Account', id: transfer.toAccountId };
    },
  },
};

