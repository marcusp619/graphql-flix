const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    movies: [Movie]
    movie(movieId: ID!): Movie!
    shows: [TV]
    videos: [Video]
    users: [User]
    me(userId: ID!): User
  }

  # The "Mutation" type is the root of all GraphQL creations, deletions and updates
  type Mutation {
    login(email: String): LoginResponse!
    newUser(username: String!, email: String!): LoginResponse!
  }

  # "MovieType"
  type Movie {
    poster_path: String
    adult: Boolean
    overview: String
    release_date: String
    genre_ids: [String]
    genres: String
    id: ID
    original_title: String
    original_language: String
    title: String
    backdrop_path: String
    popularity: Float
    vote_count: Float
    duration: Int
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
    videos: [Video]
  }

  #"UserType"
  type User {
    id: ID!
    UserName: String!
    UserEmail: String!
    movies: [Movie]
  }

  type LoginResponse {
    sucess: Boolean!
    message: String
  }
`;

module.exports = typeDefs;
