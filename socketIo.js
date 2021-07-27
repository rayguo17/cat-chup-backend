const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');
const redis = require('redis');

const setupSocket = (server)=>{
    const redisClient = redis.createClient({
        host:'localhost',
        port:6379
    });
    
    const io = (require('socket.io')(server,{
        cors:{
            origin:'http://localhost:3000',
            methods:['GET','POST']
        }
    }));
    const notiIO = io.of('/noti')
    notiIO.use((socket,next)=>{
        if(socket.handshake.query && socket.handshake.query.token){
            jwt.verify(socket.handshake.query.token,jwtSecret,function(err,decoded){
                if(err)return next(new Error('Authentication error'));
                //console.log('jwt decoded',decoded)
                socket.decoded = decoded;
                next();
            })
        }
        else{
            console.log('socket not connected')
            next(new  Error('Authentication error'))
        }
    });
    let users = [];
    const getUser = (username)=>{
        let match = users.find((user)=>user.username===username);
        if(match){
            return match.socketId
        }
        else{
            return false;
        }
    }
    notiIO.on('connection',socket=>{
        console.log('connected!');
        //console.log('socket');
        //console.log('connected user',users);
        socket.on('login',function(data){
            console.log('a use',data.username,socket.id);
            //need to check this user exist or not?
            let match = users.find((user)=>user.username===data.username)
            if(match){
                users = users.filter((user)=>user.username!==data.username);
            }
            users.push({
                username:data.username,
                socketId:socket.id
            })
            //after set up user, check redis if he have new noti then render it out
            let unSendNoti = [];
            redisClient.lrange(data.username,0,-1,function(err,items){
                items.forEach(function(item,i){
                    unSendNoti.push(JSON.parse(item));
                })
                console.log('unsend notifications',unSendNoti);
                socket.emit('initialNoti',unSendNoti);
            })
            
            console.log('users list',users)
        })
        socket.on('clearNoti',(username)=>{
            redisClient.del(username);
        })
        socket.on('getMessage',message=>{
            console.log('get message',message);
            socket.emit('getMessage',message)
        })
        socket.on('comment',data=>{
            console.log('get comment',data);
            let targetSocketId = getUser(data.recipient);
            if(targetSocketId){
                notiIO.to(targetSocketId).emit('comment',data);
            }else{
                //store the message into redis
                console.log('this user is not online');
                redisClient.lpush(data.recipient,JSON.stringify(data),function(err,number){
                    console.log('insert done',number);
                });
                
            }
        })
        socket.on('acceptEvent',data=>{
            console.log('accept event',data);
            let targetSocketId = getUser(data.recipient);
            if(targetSocketId){
                notiIO.to(targetSocketId).emit('acceptEvent',data);
            }else{
                //store the message into redis
                console.log('this user is not online');
                redisClient.lpush(data.recipient,JSON.stringify(data),function(err,number){
                    console.log('insert done',number);
                });
                
            }
        })
        socket.on('like',data=>{
            console.log('get like',data);
            let targetSocketId = getUser(data.recipient);
            if(targetSocketId){
                notiIO.to(targetSocketId).emit('like',data);
            }else{
                //store the message into redis
                redisClient.lpush(data.recipient,JSON.stringify(data),function(err,number){
                    console.log('insert done',number);
                });
            }
            
        })
        socket.on('friend_request',data=>{
            console.log('add_friend',data);
            //first check if target exist
            //if exist then send to target
            let targetSocketId = getUser(data.recipient);
            if(targetSocketId){
                notiIO.to(targetSocketId).emit('friend_request',data);
            }else{
                //store the message into redis
                console.log('this user is not online');
                redisClient.lpush(data.recipient,JSON.stringify(data),function(err,number){
                    console.log('insert done',number);
                });
            }
            
        })
        socket.on('joinEvent',data=>{
            console.log('join event',data);
            let targetSocketId = getUser(data.recipient);
            if(targetSocketId){
                notiIO.to(targetSocketId).emit('joinEvent',data);
            }else{
                //store the message into redis
                redisClient.lpush(data.recipient,JSON.stringify(data),function(err,number){
                    console.log('insert done',number);
                });
            }
            
        })
        socket.on('disconnect',function(){
            console.log('user disconnecting',socket.id);
            users = users.filter((user)=>user.socketId!==socket.id)
            console.log('users list',users);
        })
    })
}



module.exports = setupSocket;