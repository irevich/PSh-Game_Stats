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
const PLAYERS_MAX = 6;
const TIME_IN_MINUTES_TO_INSERT_PLAYERS = 5;

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
        await PlayerApi.insertPlayer(pgClient);
    }

});


//PORT
const port = process.env.PORT || 3000 ;
app.listen(port, ()=>console.log(`API listening to port ${port} . . .`));