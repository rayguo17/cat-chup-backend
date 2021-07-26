

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
    getPostDetail(postId){
        return this.knex('post').where('post.id',postId).join('user',{'user.username':'owner_name'}).select(['post.*','user.username','user.imgPath']);
    }
    insertLike(user,postId){
        return this.knex('like').insert({username:user,post_id:postId}).returning('*');
    }
    getPostPure(postId){
        return this.knex('post').where('id',postId).select('*');
    }
    updatePostContent(postId,newContent){
        return this.knex('post').where('id',postId).update('content',newContent).returning(['content','owner_name']);
    }
    insertNoti(newNoti){
        return this.knex('notification').insert(newNoti).returning('*');
    }
    getLikeDetail(likeId){
        return this.knex('like').where('like.id',likeId).join('user',{'user.username':'like.username'}).select(['like.*','user.imgPath']);
    }
    insertComment(user,comment,postId){
        return this.knex('comment').insert({username:user,content:comment,post_id:postId}).returning('*');
    }
    getCommentDetail(commentId){
        return this.knex('comment').where('comment.id',commentId).join('user',{'user.username':'comment.username'}).select(['comment.*','user.imgPath']);
    }
    storeSchedule(newSchedule){
        return this.knex('schedule').insert(newSchedule).returning('*');
    }
}

module.exports = PostService