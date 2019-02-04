import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://server-9p68l9c05.now.sh/',
  cors: false
})
const client = new ApolloClient({
  cache,
  link
})

client
  .query({
    query: gql`
      query GetMovies {
        movies {
          id
          title
        }
      }
    `
  })
  .then(result => console.log(result));