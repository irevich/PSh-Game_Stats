const request = require('request');
const ApiUtils = require('./api_utils');
const StatApi = require('./stat');
const jpeg = require('jpeg-js');
const fs = require('fs');

const randomUserApiUrl = 'https://randomuser.me/api';
const PROFILE_IMAGE_NAME = 'user_profile_image.jpg'

class PlayerApi{

    static async insertPlayer(client){
        //First, we get the nickname and the profile image from the randomUser api

        request({url:randomUserApiUrl}, async (err,res)=>{
            const data = JSON.parse(res.body);
            const username = data.results[0].name;
    
            //For the nickname we concat the fields "title","first" and "last" from the name, with the "_" between each field, then
            //we transform it to lowercase, and then we remove the spaces
            const nickname = username.title.concat('_',username.first).concat('_',username.last).toLowerCase().replace(/\s/g, '');
            
            //The for the image we download it from the api results, and save it with the filename 'user_profile_image.jpg' in the
            //current directory
    
            const imageUrl = data.results[0].picture.large;
            ApiUtils.downloadImageFromURL(imageUrl,PROFILE_IMAGE_NAME);
    
            //Then, we transform it to a byte array, so later we can save it in db
    
            const jpegData = fs.readFileSync(PROFILE_IMAGE_NAME);
            const rawImageData = jpeg.decode(jpegData, {useTArray: true}); // return as Uint8Array
            let imageByteArray = rawImageData.data;

            let hexString = Buffer.from(imageByteArray).toString('hex');
    
            //Then, we insert in player table, and return the created id

            const result = await client.query(`insert into player (nickname,profile_image) values ('${nickname}',decode('${hexString}', 'hex')
            ) returning player_id`);

            const playerId = result.rows[0].player_id;

            //Finally, we insert a stat for that player using the id created
            await StatApi.insertStat(client,playerId);
            
        })
    }

 


}

module.exports = PlayerApi;