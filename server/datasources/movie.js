const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/movie/';
  }

  async getPopularMovies() {
      const response = await this.get('popular?api_key=${process.env.API_KEY}&language=en-US&page=1');
      return Array.isArray(response)
      ? response.map(movie => this.movieReducer(movie))
      : [];
  }


  movieReducer(movie) {
      return {
        poster_path: movie.poster_path,
        adult: movie.adult,
        overview: movie.overview,
        release_date: movie.release_date,
        genre_ids: [movie.genre_ids],
        id: movie.id,
        original_title: movie.original_title,
        original_language: movie.original_language,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        popularity: movie.popularity,
        vote_count: movie.vote_count,
        videos: {
          id: movie.video.id,
          iso_639_1: movie.video.iso_639_1,
          iso_3166_1: movie.video.iso_3166_1,
          key: movie.video.key,
          name: movie.video.name,
          site: movie.video.site,
          size: movie.video.size,
          type: movie.video.type,  
        }
      }
  }
}

module.exports = LaunchAPI;