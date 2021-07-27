class ScheduleService{
    constructor(knex) {
        this.knex = knex
    }

    getSchedule(username){
        return this.knex('schedule').where('executor',username).join('user',{'user.username':'creator'})
                    .select(['schedule.*','user.imgPath']);
    }
    getPostDetail(postId){
        return this.knex('post').where('id',postId).select('*');
    }
    storeSchedule(newSchedule){
        return this.knex('schedule').insert(newSchedule).returning('*');
    }
    solveNoti(notiId){
        return this.knex('notification').where('id',notiId).update('solved',true);
    }
    insertNoti(newNoti){
        return this.knex('notification').insert(newNoti);
    }
}

module.exports = ScheduleService;