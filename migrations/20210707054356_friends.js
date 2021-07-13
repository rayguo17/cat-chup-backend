
exports.up = function(knex) {
    return knex.schema.createTable('friends',(table)=>{
        table.integer('user_id');
        table.json('friends_list');
        table.foreign('user_id').references('user.id');
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('friends');
};
