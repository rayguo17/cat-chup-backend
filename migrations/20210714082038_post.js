
exports.up = function(knex) {
  return knex.schema.createTable('post',(table)=>{
        table.increments('id');
        table.string('owner_name');
        table.json('content');
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.string('type');
        // table.foreign('owner_imgPath').references('user.imgPath');
        table.string('owen_imgPath');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('post');
};
