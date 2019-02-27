// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/movies',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
