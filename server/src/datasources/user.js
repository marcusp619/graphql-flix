const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");

class UserAPI extends DataSource {
  constructor(store) {
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
    let newUser = null;

    if (!email || !isEmail.validate(email)) return null;

    const user = await this.store("users")
      .where("email", email)
      .select();

    if (Object.keys(user).length < 1) {
      newUser = await this.store("users").insert({ email }, "*");
    } else {
      return user[0];
    }

    return newUser && newUser[0] ? newUser[0] : null;
  }

  async addMovie({ movieId }) {
    const { id } = this.context.user;
    const response = await this.store("content").insert(
      {
        contentID: id,
        movieID: movieId
      },
      "*"
    );
    return response;
  }

  async removeMovie({ movieId }) {
    const { id } = this.context.user;
    const response = await this.store("content")
      .where({
        movieID: movieId,
        contentID: id
      })
      .del();
    console.log(response);
  }
}

module.exports = UserAPI;
