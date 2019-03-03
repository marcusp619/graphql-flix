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
      ? response.map(movie => this.moviesReducer(movie))
      : [];
  }

  async getAMovie() {
    const response = await this.get(
      `${movieId}?api_key=${process.env.API_KEY}&language=en-US`
    );

    return this.moviesReducer(response[0]);
  }

  moviesReducer(movie) {
    return {
      poster_path: movie.poster_path,
      adult: movie.adult,
      overview: movie.overview,
      release_date: movie.release_date,
      genre_ids: movie.genre_ids,
      genres: movie.genres,
      id: movie.id,
      original_title: movie.original_title,
      original_language: movie.original_language,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      popularity: movie.popularity,
      vote_count: movie.vote_count,
      duration: movie.duration,
      videos: movie.videos
    };
  }
}

module.exports = MovieAPI;
