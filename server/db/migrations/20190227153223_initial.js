exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", table => {
      table.increments("id").primary();
      table.string("UserName");
      table.string("UserEmail");

      table.timestamps(true, true);
    }),

    knex.schema.createTable("content", table => {
      table.increments("id").primary();
      table.string("title");
      table.integer("contentID").unsigned();
      table.foreign("contentID").references("users.id");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("content"),
    knex.schema.dropTable("users")
  ]);
};
