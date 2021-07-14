
class UserService {
    constructor(knex){
        this.knex = knex
    }
    getProfile(username){
        return this.knex('user').where('username',username).select(['email','phone','city','description','imgPath','username','bgImgPath']);
    }
    updateProfile(username,newProfile){
        return this.knex('user').where('username',username).update(newProfile).returning('*');
    }
    getFriends(username){
        return this.knex('friends').where('username',username).select('*');
    }
    newNotification(newNoti){
        return this.knex('notification').insert(newNoti).returning('*');
    }
    getNotifications(username){
        return this.knex('notification').select('*').where('recipient',username).orderBy('created_at','desc');
    }
}

module.exports = UserService