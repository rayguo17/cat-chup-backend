const express = require('express');

class PostRouter {
    constructor(servcie){
        this.service = servcie
    }
    router(){
        const router  = express.Router();
        router.post('/',this.newPost.bind(this));
        router.post('/like',this.likePost.bind(this))
        router.get('/:user',this.loadPost.bind(this));
        router.get('/user/:user',this.getPersonalPost.bind(this))
        router.get('/:user/friend/:friend',this.getFriendPost.bind(this))
        router.get('/:postid/user/:user',this.getPostDetail.bind(this))
        router.get('/like/:likeId',this.getLikeDetail.bind(this))
        router.post('/comment',this.commentPost.bind(this));
        router.get('/comment/:commentId',this.getCommentDetail.bind(this));
        router.post('/eventNoti',this.joinEvent.bind(this));
        return router;
    }
    async joinEvent (req,res){
        try {
            console.log('joining event in noti',req.body);
            let newNoti = {};
            Object.assign(newNoti,req.body);
            let newContent = {
                postId:req.body.content.postId
            }
            newNoti.content = JSON.stringify(newContent);
            let saveReq = await this.service.insertNoti(newNoti);
            console.log('insert noti result',saveReq);
            res.sendStatus(200);
        } catch (error) {
            console.log('join event notification error',error);
            res.sendStatus(500);
        }
    }
    async getCommentDetail(req,res){
        try {
            console.log('getting comment detail',req.params);
            let commentId = req.params.commentId;
            let getCommentSe = await this.service.getCommentDetail(commentId);
            console.log('get comment res',getCommentSe);
            res.send(getCommentSe[0]);
        } catch (error) {
            console.log('get comment detail error',error)
            res.sendStatus(500);
        }
    }
    async commentPost(req,res){
        try {
            console.log('try to comment post',req.body);
            let {user,comment,postId} = req.body;
            let commentInSe = await this.service.insertComment(user,comment,postId);
            console.log('comment insert res',commentInSe);
            let commentId = commentInSe[0].id;
            let targetPost = await this.service.getPostPure(postId);
            let newContent = targetPost[0].content;
            newContent.comments.push(commentId);
            let updatePost = await this.service.updatePostContent(postId,newContent);
            console.log('updated content',updatePost);
            let newNoti = {
                recipient:updatePost[0].owner_name,
                donor:user,
                type:'comment',
                content:{postId:postId,comment:comment}
            }
            let insertNoti = await this.service.insertNoti(newNoti);
            console.log('insertNoti',insertNoti);
            res.send({commentId:commentId});
        } catch (error) {
            console.log('comment post error',error);
            res.sendStatus(500);
        }
    }
    async getLikeDetail(req,res){
        try {
            console.log('getting like detail',req.params);
            let likeId = req.params.likeId;
            let getLikeSe = await this.service.getLikeDetail(likeId);
            console.log('getLike res',getLikeSe);
            res.send(getLikeSe[0]);
        } catch (error) {
            console.log('get like detail',error);
            res.sendStatus(500);
        }
    }
    async likePost(req,res){
        try {
            console.log('trying to like post', req.body);
        //res.sendStatus(200);
        let user= req.body.user;
        let postId=req.body.postId;
        let likeInSe = await this.service.insertLike(user,postId);
        console.log('like table res',likeInSe); 
        let likeId = likeInSe[0].id;
        let targetPost = await this.service.getPostPure(postId);
        let newContent = targetPost[0].content;
        let newObj = {
            likeId:likeId,
            user:user
        }
        newContent.likes.push(newObj);
        let updatePost = await this.service.updatePostContent(postId,newContent);
        console.log('updated content',updatePost);
        let newNoti = {
            recipient:updatePost[0].owner_name,
            donor:user,
            type:'like',
            content:{postId:postId}
        }
        let insertNoti = await this.service.insertNoti(newNoti);
        console.log('insertNoti',insertNoti);
        res.send(newObj);
        } catch (error) {
            console.log('like post error',error);
            res.sendStatus(500);
        }
        
    }
    async getPostDetail(req,res){
        //TODO check username before giving out the post info
        console.log('trying to get post detail',req.params);
        let postId = req.params.postid;
        let username = req.params.user;
        let getPostDetailSe = await this.service.getPostDetail(postId);
        console.log('get post res',getPostDetailSe);
        res.send(getPostDetailSe[0]);
    }
    async getFriendPost(req,res){
        console.log('getting friend post',req.params);
        const {friend,user} = req.params;
        let postQuery = await this.filterPost(friend,user);
        //console.log('post query result',postQuery);
        res.send(postQuery);
    }


    async getPersonalPost(req,res){
        console.log('get personal post',req.params);
        try {
            let user = req.params.user;
            let getSelfPostQuery = await this.service.getSelfPost(user);
            //console.log('get self post result',getSelfPostQuery);
            getSelfPostQuery.sort((a,b)=>{
                if(a.created_at<b.created_at){
                    return 1;
                }else{
                    return -1;
                }
            })
            res.send(getSelfPostQuery);
        } catch (error) {
            console.log('get personal post error',error);
            res.sendStatus(500);
        }
    }


    async newPost(req,res){
        try {
            console.log('new post',req.body);
            let newPostReq = req.body;
            let newPost = {
                type:newPostReq.type,
                owner_name:newPostReq.owner_name,
                visible_group:newPostReq.visible_group
            }
            newPostReq.content.likes=[];
            newPostReq.content.comments=[];
            
            let content = JSON.stringify(newPostReq.content);
            newPost.content=content;
            let storePost = await this.service.storePost(newPost);
            //console.log('store post result ', storePost);
            if(newPostReq.type==='event'){
                let newSchedule = {
                    creator:newPost.owner_name,
                    executor:newPost.owner_name,
                    start:newPostReq.content.start,
                    end:newPostReq.content.end,
                    type:'event',
                }
                let scheduleContent = {
                    title:newPostReq.content.title,
                    caption:newPostReq.content.caption,
                    post_id:storePost[0].id,
                    attachPic:newPostReq.content.attachPic,
                }
                newSchedule.content = JSON.stringify(scheduleContent);
                let storeSchedule = await this.service.storeSchedule(newSchedule);
                console.log('store schedule result',storeSchedule);
            }
            
            let getUserInfoQuery = await this.service.getUserInfo(newPost.owner_name);
            //console.log('get user info res',getUserInfoQuery);
            let returnPost = storePost[0]
            returnPost.username=getUserInfoQuery[0].username;
            returnPost.imgPath=getUserInfoQuery[0].imgPath;
            if(storePost[0]){
                res.send(returnPost);
            }

        } catch (error) {
            console.log('error when adding new post',error);
            res.sendStatus(500);
        }
        
    }
    async loadPost(req,res){
        try {
            //console.log('load post req',req.params);
            let owner = req.params.user;
            let ownerFriendListQuery = await this.service.getFriendList(owner);
            //console.log('owner friend list', ownerFriendListQuery[0]);
            let ownerFriendList =ownerFriendListQuery[0].friends_list["All Friends"];
            let getPostPromises = [];
            for(let i=0;i<ownerFriendList.length;i++){
                getPostPromises.push(this.filterPost(ownerFriendList[i],owner));
            }
            let getPostRes = await Promise.all(getPostPromises);
            //console.log('get post res',getPostRes);
            let formatPostList = [];
            for(let i=0;i<getPostRes.length;i++){
                formatPostList = formatPostList.concat(getPostRes[i]);

            }
            let selfPostQuery = await this.service.getSelfPost(owner); 
            //console.log('self post res',selfPostQuery);
            formatPostList=formatPostList.concat(selfPostQuery);
            formatPostList.sort((a,b)=>{
                //console.log('sorting')
                if(a.created_at<b.created_at){
                    return 1;
                }else{
                    return -1;
                }
            })
            //console.log('formatPostList',formatPostList);
            res.send(formatPostList);
        } catch (error) {
            console.log('load post error',error)
        }
    }
    async filterPost(friend,owner){
        let friendListQuery = await this.service.getFriendList(friend);
        let friendList = friendListQuery[0].friends_list;
        let inGroup = [];
        for(let [key,value] of Object.entries(friendList)){
            let match = value.find(name=>name==owner);
            if(match)inGroup.push(key);
        }
        //console.log('in group',friend,inGroup);
        let friendPostPromise = [];
        for (let i=0;i<inGroup.length;i++){
            friendPostPromise.push(this.service.getPostByName(friend,inGroup[i]));
        }
        let friendPostRes = await Promise.all(friendPostPromise);
        //console.log('friend post res',friend,friendPostRes);
        let formatPostList = [];
        for(let i=0;i<friendPostRes.length;i++){
            //console.log('i am runned',friendPostRes[i])
            formatPostList = formatPostList.concat(friendPostRes[i]);
            
        }
        return formatPostList;
        //console.log('format post list',friend,formatPostList);
    }
}

module.exports = PostRouter;