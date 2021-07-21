class FriendService {
    constructor(knex){
        this.knex = knex
    }
    getFriendList(username){
        return this.knex('friends').where('username',username).select('friends_list');
    }
    acceptFriendNoti(a,b,type){
        return this.knex('notification').where({recipient:a,donor:b,type:type}).update('solved',true).returning('*');
    }
    updateFriendList(username,friendList){
        return this.knex('friends').where('username',username).update('friends_list',friendList).returning('*');
    }
    searchUser(query){
        return this.knex('user').whereRaw(`document @@ to_tsquery('${query}:*')`).select('*');
    }
}

module.exports = FriendService