exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('content', table => {
      table.integer('movieID');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('content', table => {
      table.dropColumn('movieID');
    })
  ]);
};
