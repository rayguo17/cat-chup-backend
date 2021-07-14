const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');
const setupSocket = (server)=>{
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
    })
    notiIO.on('connection',socket=>{
        console.log('connected!');
        //console.log('socket');
        socket.on('getMessage',message=>{
            socket.emit('getMessage',message)
        })
    })
}

module.exports = setupSocket;