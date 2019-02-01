const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
    movies: [Movie]!
    tv: [TV]
    videos: [Video]
  }

  type Mutation {
    login(email: String): String

    addMovies(movieIds: [ID]!): MovieUpdateResponse!
  }

  type MovieUpdateResponse {
    success: Boolean!
    message: String
    movies: [Movie]
  }

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
    videos: Video
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

  #"UserType"
  type User {
    id: ID!
    email: String!
    movies: [Movie]
  }  
`

module.exports = typeDefs;

