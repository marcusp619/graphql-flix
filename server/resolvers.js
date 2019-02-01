module.exports = {
    Query:{
      movies: async (_, __, { dataSources }) =>
        dataSources.movieAPI.getPopularMovies(),
      me: async (_, __, { dataSources }) =>
        dataSources.userAPI.findOrCreateUser(),
    },
    Movie: {
      videos: async (parent, __, { dataSources }) => 
        dataSources.videoAPI.getVideosById(parent.id),
    }
}