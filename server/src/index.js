const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const MovieAPI = require("./datasources/movie");
const VideoAPI = require("./datasources/video");
const TVAPI = require("./datasources/tv");
const UserAPI = require("./datasources/user");

const PORT = 4000;
const app = express();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../knexfile")[environment];
const database = require("knex")(configuration);
const store = database;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieAPI: new MovieAPI(),
    videoAPI: new VideoAPI(),
    tvAPI: new TVAPI(),
    user: new UserAPI({ store })
  })
});

// // the function that sets up the global context for each resolver, using the req
// const context = async ({ req }) => {
//   // simple auth check on every request
//   const auth = (req.headers && req.headers.authorization) || '';
//   const email = new Buffer(auth, 'base64').toString('ascii');

//   // if the email isn't formatted validly, return null for user
//   if (!isEmail.validate(email)) return { user: null };
//   // find a user by their email
//   const users = await store.users.findOrCreate({ where: { email } });
//   const user = users && users[0] ? users[0] : null;

//   return { user: { ...user.dataValues } };
// };

server.applyMiddleware({ app });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
