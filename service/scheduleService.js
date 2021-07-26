class ScheduleService{
    constructor(knex) {
        this.knex = knex
    }

    getSchedule(username){
        return this.knex('schedule').where('executor',username).select('*');
    }
}

module.exports = ScheduleService;