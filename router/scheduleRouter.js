const express = require('express');

class ScheduleRouter{
    constructor(service) {
        this.service = service
    }
    router(){
        const router = express.Router();
        router.get('/:user',this.getSchedule.bind(this))
        router.post('/accept',this.acceptSchedule.bind(this));
        return router;
    }
    async acceptSchedule(req,res){
        try {
            console.log('accepting join schedule',req.body);
            let postId = req.body.post_id;
            let executor = req.body.executor;
            let notiId = req.body.noti_id;
            let getPostDetail = await this.service.getPostDetail(postId);

            console.log('get post detail res',getPostDetail);
            let newSchedule = {
                creator:getPostDetail[0].owner_name,
                executor:executor,
                start:getPostDetail[0].content.start,
                end:getPostDetail[0].content.end,
                type:'event'
            }
            let scheduleContent = {
                title:getPostDetail[0].content.title,
                caption:getPostDetail[0].content.caption,
                post_id:getPostDetail[0].id,
                attachPic:getPostDetail[0].content.attachPic,
            }
            newSchedule.content = JSON.stringify(scheduleContent);
            let storeSchedule = await this.service.storeSchedule(newSchedule);
            let updateNoti = await this.service.solveNoti(notiId);
            let newNoti = {
                recipient:executor,
                donor:getPostDetail[0].owner_name,
                type:'accept_event',
                
            }
            let notiContent = {
                postId:postId
            }
            newNoti.content = JSON.stringify(notiContent);
            let insertNoti = await this.service.insertNoti(newNoti);
            console.log('store schedule res',storeSchedule);
            res.sendStatus(200);
        } catch (error) {
            console.log('accept join schedule error',error);
            res.sendStatus(500);
        }
    }
    async getSchedule(req,res){
        try {
            console.log('getting schedule',req.params);
            let username = req.params.user;
            let getScheduleSe = await this.service.getSchedule(username);
            console.log('get schedule res',getScheduleSe);
            res.send(getScheduleSe);
        } catch (error) {
            console.log('get schedule error',error);
            res.sendStatus(500);
        }
    }
}

module.exports = ScheduleRouter;