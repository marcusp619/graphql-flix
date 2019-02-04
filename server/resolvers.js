const fetch = require("node-fetch");
require("dotenv/config");

module.exports = { 
  Query: {
    movies: async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`);
        const movies = await response.json();

        return movies.results
      } catch (error) {
        console.error(error);
      }
    },
    movie: async (_, { movieId }) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`);
        const movie = await response.json();
  
        return movie;
      } catch (error) {
        console.error(error);
      }
    },
    tv: async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`);
        const tv = await response.json();

        return tv.results;
      } catch (error) {
        console.error(error);
      }
    }
  },
  Movie: {
    videos: async (parent) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${parent.id}/videos?api_key=${process.env.API_KEY}&language=en-US`);
        const videos = await response.json();

        return videos.results;
      } catch (error) {
        console.error(error);
      }
    }
  },
  TV: {
    videos: async (parent) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${parent.id}/videos?api_key=${process.env.API_KEY}&language=en-US`);
        const videos = await response.json();

        return videos.results;
      } catch (error) {
        console.error(error);
      }
    }
  }
}