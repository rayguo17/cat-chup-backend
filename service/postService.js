

class PostService {
    constructor(knex) {
        this.knex = knex;
    }
    storePost(newPost){
        return this.knex('post').insert(newPost).returning('*');
    }
    getFriendList(user){
        return this.knex('friends').where('username',user).select('*');
    }
    getPostByName(user,group){
        return this.knex('post').where('owner_name',user).join('user',{'user.username':'owner_name'}).where('visible_group',group).select(['post.*','user.username','user.imgPath']);
    }
    getSelfPost(user){
        return this.knex('post').where('owner_name',user).join('user',{'user.username':'owner_name'}).select(['post.*','user.username','user.imgPath']);
    }
    getUserInfo(user){
        return this.knex('user').where('username',user).select(['imgPath','username']);
    }
}

module.exports = PostService