const express = require('express');
class FriendRouter {
    constructor(service){
        this.service = service;
    }
    router(){
        const router = express.Router();
        router.post('/',this.addFriend.bind(this));
        router.delete('/',this.deleteFriend.bind(this));


        return router;
    }
    async deleteFriend(req,res){
        //console.log('try to delete friend',req.body);
        // 1.delete friend for friend
        // 2.delete friend for actionOwner
        // 3.send new friend list to the frontend
        const {actionOwner,friend} = req.body
        let query = await this.service.getFriendList(friend);
        let oFLofFriend = query[0].friends_list;
        //console.log('old friend list of friend',oFLofFriend);
        let nFLofFriend = {};
        for(const [key,value] of Object.entries(oFLofFriend)){
            nFLofFriend[key] = value.filter(e=>{
                e!=actionOwner
            })
        }
        //console.log('new friend list of friend',nFLofFriend);
        let deleteFriendForFriend = await this.service.updateFriendList(friend,nFLofFriend);
        //console.log('after update friend',deleteFriendForFriend)
        //for action owner delete friend
        let newQuery = await this.service.getFriendList(actionOwner);
        let oFLofActionOwner = newQuery[0].friends_list;
        //console.log('old friend list of actionOwner',oFLofActionOwner);
        let nFLofActionOwner = {};
        for(const [key,value] of Object.entries(oFLofActionOwner)){
            nFLofActionOwner[key] = value.filter(e=>{
                e!=friend
            })
        }
        //console.log('new friend list of actionOwner',nFLofActionOwner);
        let deleteFriendForActionOwner = await this.service.updateFriendList(actionOwner,nFLofActionOwner)
        //console.log('after update actionOwner',deleteFriendForActionOwner);
        res.send(deleteFriendForActionOwner[0].friends_list);
    }
     async addFriend(req,res){
         try {
            //console.log('try to add friend',req.body)
            const {donor,recipient,type,content} = req.body
            // 1.add friend to donor friendList need to get old friend list first
            // 2.add friend to recipient friendList
            // 3.set notification solved to true
            let oFLofDonor = await this.service.getFriendList(donor);
            //check if exist then do nothing;
    
            //console.log('old friend list of donor',oFLofDonor[0]);
            let recipientExist = oFLofDonor[0].friends_list["All Friends"].find(e=>e===recipient);
            if(!recipientExist){
                let nFlofDonor = {};
                Object.assign(nFlofDonor,oFLofDonor[0].friends_list);
                let groupArr = Object.keys(oFLofDonor[0].friends_list);
                //console.log('groupArr',groupArr);
                //console.log('checked arr',req.body.content.checked)
                groupArr.forEach(e=>{
                    for(let i=0;i<content.checked.length;i++){
                        //console.log('in loop',req.body.content.checked[i],e)
                        //console.log('array',nFlofDonor[e]);
                        if(e===content.checked[i]){
                            nFlofDonor[e].push(recipient);
                        }
                    }
                    if(e==='All Friends'){
                        nFlofDonor[e].push(recipient);
                    }
                })
                //console.log('after adding friendList donor',nFlofDonor);
                //and then update friends;
                let updateFriendList = await this.service.updateFriendList(donor,JSON.stringify(nFlofDonor));
                //console.log('updateFriendList donor',updateFriendList);
    
            }
            let oFLofRecipient = await this.service.getFriendList(recipient);
            let donorExist = oFLofRecipient[0].friends_list["All Friends"].find(e=>e===donor);
            if(!donorExist){
                let nFLofRecipient = {};
                Object.assign(nFLofRecipient,oFLofRecipient[0].friends_list);
                nFLofRecipient['All Friends'].push(donor);
                //console.log('after adding friendList recipient',nFLofRecipient);
                //and then update friends;
                let updateFriendList = await this.service.updateFriendList(recipient,JSON.stringify(nFLofRecipient));
                //console.log('updateFriendList recipient',updateFriendList);
            }
            //update the notification all the friend request done by this two would be solved
            let updateNotiF = await this.service.acceptFriendNoti(donor,recipient,type);
            let updateNotiS = await this.service.acceptFriendNoti(recipient,donor,type);
            //console.log('update noti',updateNotiF,updateNotiS);
            res.sendStatus(200);
         } catch (error) {
             console.log('add friend error',error)
             res.sendStatus(500);
         }
        
        
    }
}

module.exports = FriendRouter;