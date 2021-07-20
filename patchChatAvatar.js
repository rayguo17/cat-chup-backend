const development = require('./knexfile').development;
const knex = require('knex')(development);
require('dotenv').config()
const axios = require('axios');



async function main(){
    let allUser = await knex('user').select('*');
    let alterUserPromises = [];
for(let i=0;i<allUser.length;i++){
    let alterUserReq = axios({
        method:'put',
              url:'https://api.chatengine.io/users/'+allUser[i].chat_id,
              data:{
                  'username':allUser[i].username,
                  'secret':allUser[i].hash,
                  'avatar':process.env.API_SERVER+allUser[i].imgPath
              },
              headers:{'PRIVATE-KEY':process.env.CHAT_PRIVATE_KEY}
    })
    alterUserPromises.push(alterUserReq);
}
let alterUserRes = await Promise.all(alterUserPromises);
console.log('alter user res', alterUserRes);
}

main();