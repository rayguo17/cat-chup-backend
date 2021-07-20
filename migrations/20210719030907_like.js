
exports.up = function(knex) {
    return knex.schema.createTable('like',table=>{
        table.increments('id');
        table.string('username');
        table.foreign('username').references('user.username');
        table.integer('post_id');
        table.foreign('post_id').references('post.id')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('like');
};
