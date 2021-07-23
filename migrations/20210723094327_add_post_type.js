
exports.up = function(knex) {
  return knex.schema.alterTable('post',table=>{
      table.string('type').defaultTo('post');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('post',table=>{
      table.dropColumn('type');
  })
};
