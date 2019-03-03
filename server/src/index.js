const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const MovieAPI = require("./datasources/movie");

const PORT = 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieAPI: new MovieAPI()
  })
});

server.applyMiddleware({ app });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
