module.exports = {
    Query:{
      movies: async (_, __, { dataSources }) =>
        dataSources.movieAPI.getPopularMovies(),
      videos: async (parent, __, { dataSources }) => 
        dataSources.movieAPI.getVideoById({videoId: parent.id }),
      me: async (_, __, { dataSources }) =>
        dataSources.userAPI.findOrCreateUser(),
    } 
}