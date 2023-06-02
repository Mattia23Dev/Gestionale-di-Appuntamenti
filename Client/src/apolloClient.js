import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'
require('dotenv').config();

const GRAPHQL_ENDPOINT =
  process.env.REACT_APP_ENV === "production"
    ? `wss://${process.env.REACT_APP_PRODUCTION_SERVER_ROOT}/graphql`
    : "ws://localhost:4000/graphql";

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

const webSocketsLink = new WebSocketLink(client);

const prod = process.env.REACT_APP_PRODUCTION_SERVER_URL;
console.log(prod);
const httpLink = new createUploadLink({
  uri:
    process.env.REACT_APP_ENV === "production"
      ? `${process.env.REACT_APP_PRODUCTION_SERVER_URL}/graphql`
      : "http://localhost:4000/graphql",
  credentials: "include",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  webSocketsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  credentials: 'include',
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => console.log(message));
    }
  },
});

export default apolloClient;
