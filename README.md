# fakebank
Fakebank services using Apollo GraphQL Server and Federation, Express, REST, Faker - TypeScript

* [GraphQL](https://graphql.org/)
  * "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data."
* [GraphQL-JS](https://github.com/graphql/graphql-js)
  * "A reference implementation of GraphQL for JavaScript"
* [Apollo Server](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server)
  * "Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client"
* [Apollo Federation](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-federation)
  * "... expose a single data graph that provides a unified interface for querying all of your backing data sources"
* [Apollo REST Data Source](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-datasource-rest)
  * "This package exports a (RESTDataSource) class which is used for fetching data from a REST API and exposing it via GraphQL within Apollo Server."
* [Apollo Gateway](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-gateway) (sits above other GraphQL services)
* [GraphQL DataLoader](https://github.com/graphql/dataloader)
  * "DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching."
  * improve performance of GraphQL service
* [Express](https://github.com/expressjs/express/)
  * "Fast, unopinionated, minimalist web framework for node"
  * Create an HTTP service quickly
* [Faker](https://github.com/marak/Faker.js/)
  * "generate massive amounts of realistic fake data in Node.js and the browser"
  * helps create random/mock data

## List of core REST services

* rest-auth (http://localhost:10111)
  * manages login actions, user records
* rest-accounts (http://localhost:10222)
  * manages bank accounts and transactions
* rest-payments (http://localhost:10333)
  * manages money transfers

## List of GraphQL services using Core REST services

* gql-fed-auth (http://localhost:20111)
  * uses rest-auth
* gql-fed-accounts (http://localhost:20222)
  * uses rest-accounts
* gql-fed-payments (http://localhost:20333)
  * uses rest-payments

# Standard GraphQL service using Core REST services

* gql-standard (http://localhost:30111)
  * uses rest-auth
  * uses rest-accounts
  * uses rest-payments

# GraphQL Gateway service

* gql-gateway (http://localhost:40111)
  * uses gql-fed-auth
  * uses gql-fed-accounts
  * uses gql-fed-payments

## Sample sequence diagrams

Use [sequencediagram.org](https://sequencediagram.org/)

### A. GraphQL Standard

````
title Fake Bank APIs with GraphQL Standard
app->api-gateway: request
api-gateway->gql-standard: request
gql-standard --> rest-X: request a
rest-X -> db-X: select data a
rest-X <- db-X: records a
gql-standard <- rest-X: response a
gql-standard --> rest-Y: request b
rest-Y -> db-Y: select data b
rest-Y <- db-Y: records b
gql-standard <- rest-Y: response b
api-gateway <- gql-standard: response
app <- api-gateway: response
````

### B. GraphQL Gateway

````
title Fake Bank APIs with GrapQL Gateway

app->api-gateway: request
api-gateway->gql-gateway: request

gql-gateway --> gql-fed-X: request a
gql-fed-X -> rest-X: request a
rest-X -> db-X: select data a
rest-X <- db-X: records a
gql-fed-X <- rest-X: response a
gql-gateway <- gql-fed-X: response a

gql-gateway --> gql-fed-Y: request b
gql-fed-Y -> rest-Y: request b
rest-Y -> db-Y: select data b
rest-Y <- db-Y: records b
gql-fed-Y <- rest-Y: response b
gql-gateway <- gql-fed-Y: response b

api-gateway <- gql-gateway: response
app <- api-gateway: response
````

## Install

```sh
npm i
```

## Start - dev mode

in separate terminals

```sh
# start rest services first
npm run start:rest-accounts
npm run start:rest-auth
npm run start:rest-payments

# one standard graphql server
npm run start:gql-standard

# or federation
npm run start:gql-fed-accounts
npm run start:gql-fed-auth
npm run start:gql-fed-payments

# start gateway last
npm run start:gql-gateway
```

## Start - prod mode

```sh
# start rest services first
npm run start:rest-accounts:prod
npm run start:rest-auth:prod
npm run start:rest-payments:prod

# one standard graphql server
npm run start:gql-standard:prod

# or federation
npm run start:gql-fed-accounts:prod
npm run start:gql-fed-auth:prod
npm run start:gql-fed-payments:prod

# start gateway last
npm run start:gql-gateway:prod
```
