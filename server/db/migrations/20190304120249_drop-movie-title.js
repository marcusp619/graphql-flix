exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("content", function(table) {
      table.dropColumn("title");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("content", function(table) {
      table.string("title");
    })
  ]);
};
