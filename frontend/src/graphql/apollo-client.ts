import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httplink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link: httplink,
  cache: new InMemoryCache(),
});
