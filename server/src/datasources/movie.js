const { RESTDataSource } = require("apollo-datasource-rest");

/* The RESTDataSource sets up and in-memory cache that caches responses 
from our REST resources with no additional setup. */

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/movie/";
  }
}

module.exports = MovieAPI;
