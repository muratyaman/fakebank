import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { AuthAPI } from '../common/AuthAPI';
import { typeDefs, resolvers } from './schema';

const port = 20111;

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      authAPI: new AuthAPI(),
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
});

server.listen(port).then(({ url }) => {
  console.log(`${url} gql-fed-auth ready`);
  console.log(`${url}.well-known/apollo/server-health for health check`);
});
