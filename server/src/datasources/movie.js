const { RESTDataSource } = require("apollo-datasource-rest");
const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

/* The RESTDataSource sets up and in-memory cache that caches responses 
from our REST resources with no additional setup. */

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/movie/";
  }

  async getPopularMovies() {
    const response = await this.get(
      `popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );

    return Array.isArray(response)
      ? response.map(movie => this.movieReducer(movie))
      : [];
  }
}

module.exports = MovieAPI;
