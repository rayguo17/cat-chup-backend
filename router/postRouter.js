const express = require('express');

class PostRouter {
    constructor(servcie){
        this.service = servcie
    }
    router(){
        const router  = express.Router();
        router.post('/',this.newPost.bind(this));

        return router;
    }
    newPost(req,res){
        console.log('new post',req.body);
    }
}

module.exports = PostRouter;