
exports.up = function(knex) {
  return knex.schema.createTable('user',(table)=>{
      table.increments('id');
      table.string('username');
      table.string('email');
      table.string('hash');
      table.string('phone');
      table.string('city')
      table.string('description')
      table.string('imgPath');
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
