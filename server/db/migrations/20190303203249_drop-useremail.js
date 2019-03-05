exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("users", function(table) {
      table.dropColumn("UserName");
      table.dropColumn("UserEmail");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("users", function(table) {
      table.string("UserName");
      table.string("UserEmail");
    })
  ]);
};
