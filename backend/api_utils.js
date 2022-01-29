const {Client} = require('pg');
const fs = require('fs');
const http = require('http'),
https = require('https');
const Stream = require('stream').Transform;

class ApiUtils{

    static async getPostgreSQLConnection(){
        
        // USE LOCAL BD (PUT PASSWORD)

        const client = new Client({
            user: "postgres",
            password: "",
            host: "localhost",
            port: 5432,
            database: "pshdevexamdb"
        });

        try{
            await client.connect();
            return client;
        }
        catch(e){
            console.error(`Failed to connect ${e}`)
        }


    }

    //Returns a random number between min (inclusive) and max (exclusive)
    //Source : https://futurestud.io/tutorials/generate-a-random-number-in-range-with-javascript-node-js
    static getRandomNumberInRange(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }

    // Download Image Helper Function
    static downloadImageFromURL = (url, filename, callback) => {

    let client = http;
    if (url.toString().indexOf("https") === 0) {
        client = https;
    }

    client.request(url, function(response) {
        let data = new Stream();

        response.on('data', function(chunk) {
            data.push(chunk);
        });

        response.on('end', function() {
            fs.writeFileSync(filename, data.read());
        });
    }).end();
};

}

module.exports = ApiUtils;