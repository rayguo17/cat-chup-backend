
exports.up = function(knex) {
  return knex.schema.createTable('post',(table)=>{
        table.increments('id');
        table.string('owner_name');
        table.json('content');
        table.timestamp('created_at').defaultTo(knex.fn.now());
<<<<<<< HEAD

        table.string('type');
        // table.foreign('owner_imgPath').references('user.imgPath');
        table.string('owen_imgPath');
=======
        table.string('visible_group');
        table.foreign('owner_name').references('user.username');
>>>>>>> c1dc22783df71dbe303efd0d0d234cc502f7186c
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('post');
};
