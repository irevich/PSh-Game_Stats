const ApiUtils = require('./api_utils');

class StatApi{
    static async insertStat(client,playerId){
        //First, we get the current date to insert it as the creation date in db
        const currentDate = Date.now();
        //Then, we get a random score for the player (from 1 to 100)
        const score = ApiUtils.getRandomNumberInRange(1,101);

        console.log(currentDate);

        //Finally, we insert the stat in the db

        await client.query(`insert into stat (player,score,creation_date) values (${playerId},${score},to_timestamp(${currentDate} / 1000.0))`);
    }
}

module.exports = StatApi;