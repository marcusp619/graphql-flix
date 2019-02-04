const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config()

class movieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/movie/';
  }

  async getPopularMovies() {
      const response = await this.get(`popular?api_key=${process.env.API_KEY}&language=en-US&page=1`);
      return typeof response === "object"
      ? response.results.map(movie => this.movieReducer(movie))
      : [];
  }

  async getMovieById (movieId) {
    const response = await this.get(`${movieId}?api_key=${process.env.API_KEY}&language=en-US`);
  
    return this.movieReducer(response);
  }

  async getMoviesById ({ movieIds }) {
    return Promise.all(
      movieIds.map(movieId => this.getMovieById(movieId))
    );
  }

  async getVideosById (videoId) {
    const response = await this.get(`${videoId}/videos?api_key=${process.env.API_KEY}&language=en-US`);
    return response.results.map(video => this.videoReducer(video))
  }

  movieReducer(movie) {
    return {
      poster_path: movie.poster_path,
      adult: movie.adult,
      overview: movie.overview,
      release_date: movie.release_date,
      genre_ids: movie.genre_ids,
      id: movie.id,
      original_title: movie.original_title,
      original_language: movie.original_language,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      popularity: movie.popularity,
      vote_count: movie.vote_count,
      videos: movie.videos
    }
  }
}

module.exports = movieAPI;