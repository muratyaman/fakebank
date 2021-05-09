import { ApolloServer } from 'apollo-server';
import { AuthAPI } from '../common/AuthAPI';
import { AccountsAPI } from '../common/AccountsAPI';
import { PaymentsAPI } from '../common/PaymentsAPI';
import { typeDefs, resolvers } from './schema';

const port = 30111;

interface IIntegrationContext {
  req: any ; // Express.Request;
  connection: any;
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const schema = {
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      authAPI: new AuthAPI(),
      accountsAPI: new AccountsAPI(),
      paymentsAPI: new PaymentsAPI(),
    }
  },
  context: (intCtx: IIntegrationContext) => {
    //const { req, connection } = intCtx;
    if (intCtx.connection && intCtx.connection.context) {
      return { ... intCtx.connection.context };
    }
    return {
      token: 'foo',
    };
  },
  logger: console,
  debug: true,
};
const server = new ApolloServer(schema);

// The `listen` method launches a web server.
server.listen(port).then(({ url }) => {
  console.log(`${url} gql-standard`);
});

