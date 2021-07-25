class NotiService{
    constructor(knex) {
        this.knex = knex
    }
    ignoreNoti(notiId){
        return this.knex('notification').where('id',notiId).update('solved',true);
    }
}

module.exports = NotiService;