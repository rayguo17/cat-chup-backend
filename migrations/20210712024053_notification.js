
exports.up = function(knex) {
  return knex.schema.createTable('notification',(table)=>{
      table.string('recipient');
      table.string('donor');
      table.string('type');
      table.json('content');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.boolean('solved').defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('notification');
};
