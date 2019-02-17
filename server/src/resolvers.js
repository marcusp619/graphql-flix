const fetch = require('node-fetch');
require('dotenv/config');

module.exports = {
  Query: {
    movies: async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${
            process.env.API_KEY
          }&language=en-US&page=1`
        );
        const movies = await response.json();

        return movies.results;
      } catch (error) {
        console.error(error);
      }
    },
    movie: async (_, { movieId }) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
            process.env.API_KEY
          }&language=en-US`
        );
        const movie = await response.json();

        return movie;
      } catch (error) {
        console.error(error);
      }
    },
    tv: async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${
            process.env.API_KEY
          }&language=en-US&page=1`
        );
        const tv = await response.json();

        return tv.results;
      } catch (error) {
        console.error(error);
      }
    }
  },
  Movie: {
    videos: async parent => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${parent.id}/videos?api_key=${
            process.env.API_KEY
          }&language=en-US`
        );
        const videos = await response.json();

        return videos.results;
      } catch (error) {
        console.error(error);
      }
    },
    genres: parent => {
      const conversionSet = {
        28: ' Action ',
        12: ' Adventure ',
        16: ' Animation ',
        35: ' Comedy ',
        80: ' Crime ',
        99: ' Documentary ',
        18: ' Drama ',
        10751: ' Family ',
        14: ' Fantasy ',
        36: ' History ',
        27: ' Horror ',
        10402: ' Music ',
        9648: ' Mystery ',
        10749: ' Romance ',
        878: ' Science Fiction ',
        10770: ' TV Movie ',
        53: ' Thriller ',
        10752: ' War ',
        37: ' Western '
      };
      const genres = parent.genre_ids
        .toString()
        .replace(/[^,]+/g, toReplace => conversionSet[toReplace]);
      return genres;
    }
  },
  TV: {
    videos: async parent => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${parent.id}/videos?api_key=${
            process.env.API_KEY
          }&language=en-US`
        );
        const videos = await response.json();

        return videos.results;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
