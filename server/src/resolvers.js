module.exports = {
  Query: {
    movies: async (_, __, { dataSources }) =>
      dataSources.movieAPI.getPopularMovies(),
    movie: async (_, { movieId }, { dataSources }) =>
      dataSources.movieAPI.getAMovieById({ movieId }),
    shows: async (_, __, { dataSources }) =>
      dataSources.tvAPI.getPopularTVShows(),
    me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  },
  Movie: {
    videos: async (parent, __, { dataSources }) =>
      dataSources.videoAPI.getMovieVideosById(parent.id),
    genres: (parent, __, { dataSources }) =>
      dataSources.movieAPI.getGenres(parent.genre_ids)
  },
  TV: {
    videos: async (parent, __, { dataSources }) =>
      dataSources.videoAPI.getShowVideosById(parent.id)
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString("base64");
    },
    addMovie: async (_, { movieId }, { dataSources }) => {
      const result = await dataSources.userAPI.addMovie({ movieId });
      const movie = await dataSources.movieAPI.getAMovieById({ movieId });

      return {
        success: true,
        message: result[0].hasOwnProperty("movieID")
          ? "Movie added successfully"
          : `the following movie couldn't be added: ${movieId}`,
        movie
      };
    },
    removeMovie: async (_, { movieId }, { dataSources }) => {
      const result = dataSources.userAPI.removeMovie({ movieId });

      if (!result) {
        return {
          success: false,
          message: "failed to remove movie"
        };
      }

      const movie = await dataSources.movieAPI.getAMovieById({ movieId });

      return {
        success: true,
        message: "movie removed",
        movie
      };
    }
  },
  User: {
    movies: async (_, __, { dataSources }) => {
      const movieIds = await dataSources.userAPI.getMovieIdsByUser();

      if (!movieIds.length) return [];

      return (
        dataSources.movieAPI.getMoviesByIds({
          movieIds
        }) || []
      );
    }
  }
};
