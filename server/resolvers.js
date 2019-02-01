module.exports = {
    Query:{
      movies: async (_, __, { dataSources }) =>
        dataSources.movieAPI.getPopularMovies(),
      movie: async (_, {id}, { dataSources }) => 
        dataSources.movieAPI.getMovieById(id),
      me: async (_, __, { dataSources }) =>
        dataSources.userAPI.findOrCreateUser(),
    },
    Mutation: {
      login: async (_, { email }, { dataSources }) => {
        const user = await dataSources.userAPI.findOrCreateUser({ email });
        if (user) return Buffer.from(email).toString('base64');
      },
      addMovies: async (_, { movieIds }, { dataSources }) => {
        const results = await dataSources.userAPI.addMovies({ movieIds });
        const movies = await dataSources.movieAPI.getMoviesById({ movieIds });
        console.log(`results:: ${results}`)
        return {
          success: results && results.length === movieIds.length,
          message: results.length === movieIds.length 
            ? 'movies added successfully'
            : `the following movies couldn't be added: ${movieIds.filter(id => !results.includes(id))}`,
            movies,
        }
      },
      // deleteMovie: async (_, { movieId }, { dataSources }) => {
      //   const result = dataSources.userAPI.deleteMovie({ movieId });
    
      //   if (!result)
      //     return {
      //       success: false,
      //       message: 'failed to delete movie',
      //     };
    
      //   const movie = await dataSources.movieAPI.getMovieById({ movieId });
      //   return {
      //     success: true,
      //     message: 'movie deleted',
      //     movies: [movie],
      //   };
      // },
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