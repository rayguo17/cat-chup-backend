const express = require('express');

class PostRouter {
    constructor(servcie){
        this.service = servcie
    }
    router(){
        const router  = express.Router();
        router.post('/',this.newPost.bind(this));
        router.get('/:user',this.loadPost.bind(this));
        router.get('/user/:user',this.getPersonalPost.bind(this))
        router.get('/:user/friend/:friend',this.getFriendPost.bind(this))
        return router;
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
                owner_name:newPostReq.owner_name,
                visible_group:newPostReq.visible_group
            }
            let content = JSON.stringify(newPostReq.content);
            newPost.content=content;
            let storePost = await this.service.storePost(newPost);
            //console.log('store post result ', storePost);
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
            //console.log('owner friend list', ownerFriendListQuery[0].friends_list["All Friends"]);
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