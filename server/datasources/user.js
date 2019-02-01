const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
    constructor({ store }) {
      super();
      this.store = store;
    }
  
    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    initialize(config) {
      this.context = config.context;
    }
  
    /**
     * User can be called with an argument that includes email, but it doesn't
     * have to be. If the user is already on the context, it will use that user
     * instead
     */
    async findOrCreateUser({ email: emailArg } = {}) {
      const email =
        this.context && this.context.user ? this.context.user.email : emailArg;
      if (!email || !isEmail.validate(email)) return null;
  
      const users = await this.store.users.findOrCreate({ where: { email } });
      return users && users[0] ? users[0] : null;
    }
  
    async addMovies({ movieIds }) {
      const userId = this.context.user.id;
      if (!userId) return;
  
      let results = [];
  
      // for each movie id, try to add the movie and add it to the results array
      // if successful
      for (const movieId of movieIds) {
        const res = await this.addMovie(movieId);
        if (res) results.push(res);
      }
      return results;
    }
  
    async addMovie(movieId) {
      const userId = this.context.user.id;
      const res = await this.store.movies.findOrCreate({
        where: { userId, movieId },
      });
      return res && res.length ? res[0].get() : false;
    }
  
    async deleteMovie({ movieId }) {
      const userId = this.context.user.id;
      return !!this.store.movies.destroy({ where: { userId, movieId } });
    }
  
    async getMovieIdsByUser() {
      const userId = this.context.user.id;
      const found = await this.store.movies.findAll({
        where: { userId },
      });
      return found && found.length
        ? found.map(l => l.dataValues.movieId).filter(l => !!l)
        : [];
    }
  
  }
  
  module.exports = UserAPI;
  