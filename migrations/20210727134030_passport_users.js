exports.up = function (knex) {
  return knex.schema
    .createTable("passport_users", (table) => {
      table.increments().primary();
      table.string("username");
      table.string("gmail_id");
      table.string("facebook_id");
      table.string("hash");
    })
    .then(() => {
      return knex.schema.createTable("notes", (table) => {
        table.increments().primary();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("passport_users.id");
        table.string("content");
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notes")
  .then(() => {
    return knex.schema.dropTable("passport_users");
  });
};
