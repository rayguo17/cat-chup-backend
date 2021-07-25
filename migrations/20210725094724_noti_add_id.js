
exports.up = function(knex) {
  return knex.schema.alterTable('notification',table=>{
      table.increments('id');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('notification',table=>{
      table.dropColumn('id');
  })
};
