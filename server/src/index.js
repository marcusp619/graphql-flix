const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const isEmail = require("isemail");

const MovieAPI = require("./datasources/movie");
const VideoAPI = require("./datasources/video");
const TVAPI = require("./datasources/tv");
const UserAPI = require("./datasources/user");

const PORT = 4000;
const app = express();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);
const store = database;

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || "";
  const email = Buffer.from(auth, "base64").toString("ascii");

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const findUser = await store("users")
    .where("email", email)
    .select();

  if (findUser.length === 0) {
    user = await this.store("users").insert({ email }, "email");
    return { user: user[0] };
  }

  return { user: findUser[0] };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => ({
    movieAPI: new MovieAPI(),
    videoAPI: new VideoAPI(),
    tvAPI: new TVAPI(),
    userAPI: new UserAPI(store)
  })
});

server.applyMiddleware({ app });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
