const { RESTDataSource } = require("apollo-datasource-rest");
require("dotenv").config();

/* The RESTDataSource sets up and in-memory cache that caches responses 
from our REST resources with no additional setup. */

class TVAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/tv/";
  }

  async getPopularTVShows() {
    const response = await this.get(
      `popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );

    return response.hasOwnProperty("results")
      ? response.results.map(show => this.TVReducer(show))
      : [];
  }

  TVReducer(show) {
    return {
      poster_path: show.poster_path,
      popularity: show.popularity,
      id: show.id,
      backdrop_path: show.backdrop_path,
      vote_average: show.vote_average,
      overview: show.overview,
      first_air_date: show.first_air_date,
      origin_country: show.origin_country,
      genre_ids: show.genre_ids,
      original_language: show.original_language,
      vote_count: show.vote_count,
      name: show.name,
      original_name: show.original_name,
      videos: show.videos
    };
  }
}

module.exports = TVAPI;
