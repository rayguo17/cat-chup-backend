
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
    getFriends(user_id){
        return this.knex('friends').where('user_id',user_id).select('*');
    }
    newNotification(newNoti){
        return this.knex('notification').insert(newNoti).returning('*');
    }
    getNotifications(username){
        return this.knex('notification').select('*').where('recipient',username).orderBy('created_at','desc');
    }
}

module.exports = UserService