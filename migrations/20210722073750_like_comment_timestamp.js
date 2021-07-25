
exports.up = function(knex) {
  return Promise.all([knex.schema.alterTable('like',table=>{
      table.timestamp('created_at').defaultTo(knex.fn.now());
  }),knex.schema.alterTable('comment',table=>{
      table.timestamp('created_at').defaultTo(knex.fn.now());
  })])
};

exports.down = function(knex) {
  return Promise.all([
      knex.schema.alterTable('like',table=>{
          table.dropColumn('created_at');
      }),
      knex.schema.alterTable('comment',table=>{
          table.dropColumn('created_at');
      })
  ])
};
