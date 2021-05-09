import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { PaymentsAPI } from '../common/PaymentsAPI';
import { typeDefs, resolvers } from './schema';

const port = 20333;

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      paymentsAPI: new PaymentsAPI(),
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
  console.log(`${url} gql-fed-payments ready`);
  console.log(`${url}.well-known/apollo/server-health for health check`);
});
