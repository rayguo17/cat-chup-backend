const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { hashPassword, checkPassword } = require('../bcrypt');
const { default: axios } = require('axios');
require('dotenv').config();
class PublicRouter {
    constructor(service){
        this.service=service;
    }
    router(){
        const router = express.Router();
        router.post('/register',this.register.bind(this));
        router.post('/login',this.login.bind(this));
        router.post('/checkUsername',this.checkUsername.bind(this));
        router.get('/users',this.getAllUsers.bind(this));
        return router;
    }
    async getAllUsers(req, res) {
        let allUsersList = await this.service.getAllUsers();
        //console.log('Users List result', allUsersList)
        res.send(allUsersList);
    }
    async register(req,res){
        try {
            console.log('register process', req.body);
            //get three things: username email password,
            //set the password into bcrypt item, and then store in db
            let hash = await hashPassword(req.body.password);
            let newUser = {}
            Object.assign(newUser,req.body);
            delete newUser.password;
            newUser.hash = hash;
            let chatProfile={
                'username':newUser.username,
                'secret':newUser.hash,
                'email':newUser.email,
                'last_name':newUser.username
            }
            let chatConfig={
                method:'post',
                url: 'https://api.chatengine.io/users/',
	            headers: {
	            	'PRIVATE-KEY': process.env.CHAT_PRIVATE_KEY
	            },
	            data : chatProfile
            }
            let chatRes = await axios(chatConfig);
            
            //console.log('chat profile create result',chatRes);
            newUser.chat_id=chatRes.data.id;
            let id = await this.service.insertUser(newUser);
            let payload = {
                id: id[0],
                username:newUser.username
            }
            let newFriendsList = {
                "All Friends":[],
                "Family":[],
                "Work":[],
                "School":[],
                "Close Friends":[]
            }
            let newData = {
                username:newUser.username,
                friends_list:JSON.stringify(newFriendsList)
            }
            let savedFriends = await this.service.initialFriends(newData);
            //console.log('save friends when register',savedFriends);
            //register react chat engine account;
            
            let token = jwt.sign(payload, jwtSecret);
            res.json({
                token: token
            })
        } catch (error) {
            console.log('register', error)
        }
    }
    async login(req,res){
        try {
            console.log('login process',req.body)
        if (req.body.username && req.body.password) {
            let username = req.body.username;
            let password = req.body.password;
            let query = await this.service.getUser(username);
            if(query[0]){
                let hash = query[0].hash;
            let match = await checkPassword(password,hash);
            if(match){
                let payload = {
                    id:query[0].id,
                    username:username
                };
                let token =jwt.sign(payload,jwtSecret);
                res.json({token:token})
            }else{
                res.sendStatus(401);
            }
            }else{
                res.sendStatus(401);
            }
            
        }else{
            res.sendStatus(401);
        }
        } catch (error) {
            console.log('login error',error);
        }
    }
    async checkUsername(req,res){
        try {
            console.log('username',req.body.username);
            if(!req.body.username){
                return res.send(true);
            }
            let username = req.body.username;
            let query = await this.service.checkUsername(username);
            console.log('query',query);
            if(query[0]){
                res.send(false)
            }else{
                res.send(true)
            }
        } catch (error) {
            console.log('check username error',error);
            res.send(500);
        }
    }

}

module.exports = PublicRouter;