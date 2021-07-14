
exports.up = function(knex) {
  return knex.schema.createTable('user',(table)=>{
      table.increments('id');
      table.string('username').unique();
      table.string('email');
      table.string('hash');
      table.string('phone');
      table.string('city')
      table.string('description')
      table.string('imgPath');
      table.string('bgImgPath').defaultTo('/bgPic/default_bgImage.jfif')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
