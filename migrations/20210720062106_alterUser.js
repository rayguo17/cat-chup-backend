const axios = require('axios');
require('dotenv').config();
exports.up = function(knex) {
  return knex.schema.alterTable('user',table=>{
      table.integer('chat_id');
  }).then(async ()=>{
      let allUser = await knex('user').select('*');
      let createChatUserPromises=[];
      for(let i=0;i<allUser.length;i++){
          let createUserReq = axios({
              method:'put',
              url:'https://api.chatengine.io/users/',
              data:{
                  'username':allUser[i].username,
                  'secret':allUser[i].hash
              },
              headers:{'PRIVATE-KEY':process.env.CHAT_PRIVATE_KEY}

          })
          createChatUserPromises.push(createUserReq);
      }
      let createUserRes= await Promise.all(createChatUserPromises);
      console.log('create User res',createUserRes);
      let updateUserPromises=[];
      for(let i=0;i<createUserRes.length;i++){
          let updateUserQuery = knex('user').where('username',createUserRes[i].data.username).update('chat_id',createUserRes[i].data.id).returning('*');
          updateUserPromises.push(updateUserQuery);

      }
      let updateUserRes = await Promise.all(updateUserPromises);
      console.log('updateUserRes',updateUserRes);
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('user',table=>{
      table.dropColumn('chat_id');
  })
};
