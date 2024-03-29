
exports.up = function(knex) {
  return knex.schema.createTable('post',(table)=>{
        table.increments('id');
        table.string('owner_name');
        table.json('content');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('visible_group');
        table.foreign('owner_name').references('user.username');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('post');
};
