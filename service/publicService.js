class PublicService {
    constructor(knex){
        this.knex=knex
    }
    insertUser(newUser){
        return this.knex('user').insert(newUser).returning('id');
    }
    getUser(username){
        return this.knex('user').where('username', username)
        .select('id', 'hash');
    }
    checkUsername(username){
        return this.knex('user').where('username',username);
    }
    initialFriends(initial){
        return this.knex('friends').insert(initial).returning('*');
    }
    getAllUsers() {
        return this.knex('user').select(['id', 'username']);
    }
}


module.exports = PublicService;