const express = require('express');
class UserRouter {
    constructor(service){
        this.service=service;
    }
    router(){
        const router = express.Router();
        router.get('/profile/:user',this.getProfile.bind(this))
        router.put('/profile/:user',this.updateProfile.bind(this));
        router.get('/friends/:user',this.getFriends.bind(this));
        router.post('/friendRequest',this.postFriendRequest.bind(this))
        router.get('/notifications/:user',this.getNotifications.bind(this))
        return router;
    }
    async getNotifications(req,res){
        console.log(req.params);
        let username = req.params.user;
        let getNotiService =await this.service.getNotifications(username);
        console.log('getting noti service',getNotiService);
        res.send(getNotiService);
    }
    async getProfile(req,res){
        console.log(req.params);
        let username = req.params.user;
        let profile = await this.service.getProfile(username);
        console.log('profile result',profile)
        res.send(profile[0]);
    }
    async updateProfile(req,res){
        console.log('update Profile',req.params);
        console.log('body',req.body)
        let username = req.params.user;
        let newProfile = req.body;
        let updateRes = await this.service.updateProfile(username,newProfile) 
        console.log('update res',updateRes);
        res.sendStatus(200);
    }
    //dont't use user_id, just use username as identifier
    async getFriends(req,res){
        console.log('get friends',req.params);
        let user_id = req.params.user;
        let friendRes = await this.service.getFriends(user_id);
        console.log('friendRes',friendRes);
        res.json(friendRes[0]);
    }
    async postFriendRequest(req,res){
        try {
            console.log('req intro',req.body);
        let newNoti = {};
        Object.assign(newNoti,req.body);
        let newContent = {
            intro:req.body.intro
        }
        delete newNoti.intro;
        newNoti.content = JSON.stringify(newContent);
        let saveReq = await this.service.newNotification(newNoti);
        console.log('saving notification',saveReq);
        if(saveReq[0].created_at){
            res.sendStatus(200);
        }else{
            res.sendStatus(500);
        }
        
        } catch (error) {
            console.log('postFriendReq error',error)
            res.sendStatus(500);
        }
        
    }
}

module.exports = UserRouter