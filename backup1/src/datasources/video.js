const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config()

class videoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/movie/';
  }

  // async getVideoById (videoId) {
  //   const response = await this.get(`${videoId}/videos?api_key=${process.env.API_KEY}&language=en-US`);
  //   console.log(response)
  //   return this.movieReducer(response.results);
  // }

  async getVideosById (videoId) {
    const response = await this.get(`${videoId}/videos?api_key=${process.env.API_KEY}&language=en-US`);
    return response.results.map(video => this.videoReducer(video))
  }

  videoReducer(video) {
      return {
        id: video.id,
        iso_639_1: video.iso_639_1,
        iso_3166_1: video.iso_3166_1,
        key: video.key,
        name: video.name,
        site: video.site,
        size: video.size,
        type: video.type,  
      }
  }
}

module.exports = videoAPI;