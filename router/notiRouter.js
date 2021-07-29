const express = require('express');

class NotiRouter{
    constructor(service) {
        this.service = service
    }
    router(){
        const router = express.Router();
        router.get('/ignore/:notiId',this.ignoreNoti.bind(this));

        return router;
    }
    async ignoreNoti(req,res){
        try {
            //console.log('ignoring noti',req.params);
            let notiId = req.params.notiId;
            let ignoreNotiSe = await this.service.ignoreNoti(notiId);
            res.sendStatus(200);
        } catch (error) {
            console.log('ignore noti error',error);
            res.sendStatus(500);
        }
    }
}

module.exports = NotiRouter;