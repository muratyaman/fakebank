import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { AccountsAPI } from '../common/AccountsAPI';
import { typeDefs, resolvers } from './schema';

const port = 20222;

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      accountsAPI: new AccountsAPI(),
    };
  },
  context: ({ req, connection }) => {
    console.log(JSON.stringify(req.body, null, 2));
    if (connection && connection.context) {
      return { ...connection.context };
    }
    return {
      token: 'foo',
    };
  },
  logger: console,
  debug: true,
});

server.listen(port).then(({ url }) => {
  console.log(`${url} gql-fed-accounts ready`);
  console.log(`${url}.well-known/apollo/server-health for health check`);
});
