module.exports = {
    Query:{
      movies: async (_, __, { dataSources }) =>
        dataSources.movieAPI.getPopularMovies(),
      movie: async (_, {id}, { dataSources }) => 
        dataSources.movieAPI.getMovieById(id),
      me: async (_, __, { dataSources }) =>
        dataSources.userAPI.findOrCreateUser(),
    },
    Movie: {
      videos: async (parent, __, { dataSources }) => 
        dataSources.videoAPI.getVideosById(parent.id),
    },
    User: {
      movies: async (_, __, {dataSources}) => {
        const movieIds = await dataSources.userAPI.getMovieIdsByUser();
        if (!movieIds.length) return [];

        return (
          dataSources.movieAPI.getMovieById({
            movieIds,
          }) || []
        );
      }
    }
}