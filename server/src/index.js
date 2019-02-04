const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({
  port: '*'
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});