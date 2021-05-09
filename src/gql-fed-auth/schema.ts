import { gql } from 'apollo-server';
import { AuthAPI } from '../common/AuthAPI';
import { IObject, IObjectWithId, IObjectWithUserId } from '../common/types';

export const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
  }
  
  extend type Account @key(fields: "id") {
    id: ID! @external
    userId: String! @external
    user: User! @requires(fields: "userId")
  }
  
  type Query {
    user(id: ID!): User
    users(limit: Int): [User]
  }
`;

interface IContextWithDataSources {
  dataSources: {
    authAPI: AuthAPI,
  };
}

export const resolvers: IObject = {
  Query: {
    //parent, args, ctx, info
    user: async (parent: any, args: IObjectWithId, ctx: IContextWithDataSources, info: any) => {
      return ctx.dataSources.authAPI.getUserByIdFast(args.id);
    },
    //parent, args, ctx, info
    users: async (parent: any, args: any, ctx: IContextWithDataSources, info: any) => {
      return ctx.dataSources.authAPI.getUsers(args);
    },
  },
  User: {
    // ref, args, ctx, info
    __resolveReference(ref: IObjectWithId, args: any, ctx: IContextWithDataSources){
      return ctx.dataSources.authAPI.getUserByIdFast(ref.id);
    }
  },
  Account: {
    user(account: IObjectWithUserId, args: any, ctx: IContextWithDataSources) {
      //console.log('resolvers Account', account, args, ctx);
      return ctx.dataSources.authAPI.getUserByIdFast(account.userId);
    },
  },
  // Transfer: {
  //   user(transfer, args, ctx: IContextWithDataSources) {
  //     return ctx.dataSources.authAPI.getUserByIdFast(transfer.userId);
  //   },
  // }
};
