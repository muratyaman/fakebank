import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const port = 40111;

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'auth',     url: `http://localhost:20111` }, // GQL service
    { name: 'accounts', url: `http://localhost:20222` }, // GQL service
    { name: 'payments', url: `http://localhost:20333` }, // GQL service
  ],
  logger: console,
  debug: true,
});

const server = new ApolloServer({
  gateway,
  engine: false,
  subscriptions: false, // TODO: not supported
});

server.listen(port).then(({ url }) => {
  console.log(`${url} gql-gateway`);
});
