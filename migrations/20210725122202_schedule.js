
exports.up = function(knex) {
  return knex.schema.createTable('schedule',table=>{
    table.increments('id');
    table.string('creator');
    table.string('executor');
    table.dateTime('start');
    table.dateTime('end');
    table.json('content');
    table.foreign('creator').references('user.username');
    table.foreign('executor').references('user.username');
    table.string('type');
    table.timestamp('created-at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('schedule');
};
