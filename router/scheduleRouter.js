const express = require('express');

class ScheduleRouter{
    constructor(service) {
        this.service = service
    }
    router(){
        const router = express.Router();
        router.get('/:user',this.getSchedule.bind(this))

        return router;
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