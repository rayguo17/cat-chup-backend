const development = require('../knexfile').development;
const knex = require('knex')(development);
require('dotenv').config();

async function main(){
    console.log('patch process start...');
    let getAllPost = await knex('post').select('*');
    console.log('get all post', getAllPost);
    let updatePostPromises = [];
    for(let i=0;i<getAllPost.length;i++){
        getAllPost[i].content.likes=[];
        getAllPost[i].content.comments=[];
        updatePostPromises.push(knex('post').where('id',getAllPost[i].id).update('content',getAllPost[i].content).returning('*'));
    }
    let updatePostRes = await Promise.all(updatePostPromises);
    console.log('update post res', updatePostRes);

}
main();

