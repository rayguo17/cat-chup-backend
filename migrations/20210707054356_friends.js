
exports.up = function(knex) {
    return knex.schema.createTable('friends',(table)=>{
        table.string('username');
        table.json('friends_list');
        table.foreign('username').references('user.username');
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('friends');
};
