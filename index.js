const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");
require("dotenv/config");

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # "MovieType" 
  type Movie {
    poster_path: String
    adult: Boolean
    overview: String
    release_date: String
    genre_ids: [String]
    id: ID
    original_title: String
    original_language: String
    title: String
    backdrop_path: String
    popularity: Float
    vote_count: Float
    videos: [Video]
  }

  # "VideoType"
  type Video {
    id: ID
    iso_639_1: String
    iso_3166_1: String
    key: String
    name: String
    site: String
    size: Int
    type: String
  }

  # "TVType"
  type TV {
    poster_path: String
    popularity: Float
    id: ID
    backdrop_path: String
    vote_average: Float
    overview: String
    first_air_date: String
    origin_country: [String]
    genre_ids: [Int]
    original_language: String
    vote_count: Int
    name: String
    original_name: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    movies: [Movie]
    tv: [TV]
    videos: [Video]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    async movies() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        const movies = await response.json();

        return movies.results
      } catch (error) {
        console.error(error);
      }
    },
  },
  Movie: {
    async videos(parent) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${parent.id}/videos?api_key=${process.env.API_KEY}&language=en-US`)
        const videos = await response.json();

        return videos.results
      } catch (error) {
        console.error(error);
      }
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});