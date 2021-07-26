
exports.up = function(knex) {
  return knex.schema.createTable('note', (table)=>{
    table.increments();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.string('content')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('note')
};
