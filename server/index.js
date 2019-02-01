const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const MovieAPI = require('./datasources/movie');
const UserAPI = require('./datasources/user');
const VideoAPI = require('./datasources/video');
const resolvers = require('./resolvers');

const store = createStore();

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieAPI: new MovieAPI(),
    userAPI: new UserAPI({ store }),
    videoAPI: new VideoAPI(),
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});