const express = require('express');
const app = express();
const cors = require('cors');
const cron = require('node-cron');


app.use(express.json());
app.use(cors());

//IMPORTS

const ApiUtils = require('./api_utils');
const PlayerApi = require('./player');

//CONSTANTS

const PLAYERS_MIN = 0;
const PLAYERS_MAX = 11;
const TIME_IN_MINUTES_TO_INSERT_PLAYERS = 5;
const TOP_PLAYERS_RANKING = 10;

//BD CONNECTION FUNCTION

let pgClient;

startDbConnection();

async function startDbConnection(){
    pgClient = await ApiUtils.getPostgreSQLConnection();
}

//CRON JOBS

    //Cron job for inserting players and stats (Every 5 minutes)

cron.schedule(`*/${TIME_IN_MINUTES_TO_INSERT_PLAYERS} * * * *`, async function() {

    //First, we get the number of players that we are going to insert in the db
    const playersNumber = ApiUtils.getRandomNumberInRange(PLAYERS_MIN,PLAYERS_MAX);

    console.log(`Inserting ${playersNumber} players...`)

    for(let i=1;i<=playersNumber;i++){
        await PlayerApi.insertPlayer(pgClient,i);
    }

});

//ENDPOINTS

    //Get endpoint to return the top 10 scores with the date it was required
app.get("/api/players/ranking",async (req,res)=>{
    res.setHeader("content-type", "application/json");

    //We ask the current top 10 to the db
    const playersRanking = await PlayerApi.getPlayersRanking(pgClient,TOP_PLAYERS_RANKING);

    //Then, we get the current date

    const lastModifiedDate = new Date().toString();

    //Finally we return the top and the date in an object

    let answerObject = {};
    answerObject.players_ranking = playersRanking;
    answerObject.last_modified_date = lastModifiedDate;

    res.send(answerObject);
})


//PORT
const port = 5000 ;
app.listen(port, ()=>console.log(`API listening to port ${port} . . .`));