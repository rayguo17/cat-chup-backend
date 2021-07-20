
exports.up = function(knex) {
  return knex.schema.createTable('comment',(table)=>{
    table.increments('id');
    table.string('username');
    table.string('content');
    table.integer('post_id');
    table.foreign('post_id').references('post.id');
    table.foreign('username').references('user.username');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('comment');
};
