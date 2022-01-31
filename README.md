# PSh-Game_Stats

## Autor

- [Revich, Igal Leonel](https://github.com/irevich)

## Index
- [Autor](#autor)
- [Index](#index)
- [Persistency](#persistency)
    - [Database used and previous considerations](#database-used-and-previous-considerations)
    - [Database's tables creation](#database's-tables-creation)
- [Backend(API)](#backend(api))
    - [Description](#backend-description)
    - [Execution](#backend-execution)
- [Frontend](#frontend(api))
    - [Description](#frontend-description)
    - [Execution](#frontend-execution)

## Persistency

### Database used and previous considerations

The database used was PostgreSQL

To execute the project, first of all you must have Postgres installed locally, and there create a database called "pshDevExamDB", where all the data that the API is going to manage will be storaged. You can do it by executing these commands on a terminal (Linux) or CMD (Windows) :
 - psql -U postgres -h localhost (Then you put your password) (If your user is not "postgres", you have to put your user)
 - create database pshDevExamDB;
 - \l ( to check if it was created succesfully)

After you have done that, you will have to go to the js file "api_utils", and in the function "getPostgreSQLConnection()", who is responsible of connecting the API with the database that we have just created, you have to put your password, your user, and in case you run postgres in a different port than 5432, you have to change that too.

After doing that, we are ready for the next step that is creating the tables and the default data of the database.

### Database's tables creation

First of all, you must have node installed to go on with the execution of the project.

If you do, in the terminal of the IDE where you have opened the project, and in the root folder of these one, execute the following commands:
 - cd backend
 - cd .\create_tables_db\
 - npm install
 - node .\import_postgres.js

This commands will create the tables in database. To see the tables and their fields more in detail, you can go to the file "create_tables_postgres.sql" in the "import_tables_db" folder. The "import_postgres.js" script basically executes that SQL file.

Once you have executed this commands, you will see in the terminal the following messages :
- "Connected to PostgreSQL database"
- "Tables created successfully"

These mean that the operation was succesful

Having this done, we have the database ready to use, so now we have to execute the backend

## Backend(API)

### Description

The backend is made in Node.js

It consists in an API that executes by default in port 5000. To execute this on a different port, in the final of "index.js" in the backend folder you must change the variable "port" to the value of the port where you want to execute the API, having in mind this must be different of the port where the frontend will be executed

The API has two important parts :
- A cron job that repeats every 5 minutes, and tries to insert a random number of players (between 0 a 10), and a game stat for each one. This can be seen in the console when the message "Inserting X players" is shown. This means that the API is trying to
insert X players in the database, with X in the range previously mentioned. Then, in the console you can see if the players were successfully inserted or not with the messages "Player number i inserted" or "Player number i could not be inserted". For example, if the random number of players to insert is 7, a possible group of messages seen in console is :

                                                Inserting 7 players...
                                                Player number 4 could not be inserted
                                                Player number 1 inserted
                                                Player number 3 could not be inserted
                                                Player number 7 could not be inserted
                                                Player number 6 inserted
                                                Player number 5 inserted
                                                Player number 2 inserted

- An endpoint to get the top 10 best scores of all the players. This one is GET "/api/players/ranking", and returns a JSON object with these fields :
    - players_ranking : An array of JSON objects, where each one represents a player in the top. Every object has the player's nickname and score as fields.
    - last_modified_date : It is the date when the top was requested (It's always the current date)

An example of this one is this : 

                                    {
                                    "players_ranking": [
                                    {
                                        "nickname": "ms_alisa_lassila",
                                        "score": 98
                                    },
                                    {
                                        "nickname": "miss_victoria_jones",
                                        "score": 98
                                    },
                                    {
                                        "nickname": "monsieur_thibault_gonzalez",
                                        "score": 95
                                    },
                                    {
                                        "nickname": "mr_ali_løvås",
                                        "score": 95
                                    },
                                    {
                                        "nickname": "miss_veera_korhonen",
                                        "score": 93
                                    },
                                    {
                                        "nickname": "mr_jake_evans",
                                        "score": 92
                                    },
                                    {
                                        "nickname": "ms_marie_poulsen",
                                        "score": 92
                                    },
                                    {
                                        "nickname": "mr_arnaud_pelletier",
                                        "score": 88
                                    },
                                    {
                                        "nickname": "ms_leanne_pelletier",
                                        "score": 86
                                    },
                                    {
                                        "nickname": "ms_simona_soldal",
                                        "score": 84
                                    }
                                    ],
                                    "last_modified_date": "Mon Jan 31 2022 02:49:07 GMT-0300 (Argentina Standard Time)"
                                    }

### Execution

To execute the API in the terminal of the IDE and in the root folder of the project you have to run these commands :
- cd backend (to go to the folder that has the API files)
- npm install
- node index.js

Once you have done that, the API will be available at port 5000 by default, or in the port whose value is equal to the variable "port" at the final of the "index.js" file.

Having all the things mentionated in mind, after running the node commands explained previously, you will see in the console a message that says "Listening to port PORT . . .", where PORT is the value set in the variable "port" of the "index.js" file. This message indicates that the API is in execution and ready to use.

## Frontend

### Description

The frontend is made with React.js

It consists in a web page, where it can be seen :
- The title ("PSh-Game Stats")
- A list with the players in the top 10 (or a message "There are not players yet" in case there are not any players in the database yet )
- The date where the top was last modified
- A button to export the top in csv format (in case there is no player in database yet, this one is disable)

By default, this one is executed in port 3000. In case you want to execute it on a different port, you have to define the environment variable PORT in the terminal. This differs depending of the operating system that the computer where you are going to execute the frontend has. For example, if you want to execute the frontend in port 7000, you have to run one of these commands :
- $env:PORT=7000 (Windows)
- export PORT=7000 (Linux/Mac)

Have in mind that the port where the frontend will be executed must be different from the port where the backend is currently executing. Otherwise you will have a conflict between them.

Also, the project asumes that the API is executed in port 5000, but in case you have executed the API on a different port, you must go to the "App.jsx" file in frontend/src directory, and in "fetchPlayersList" variable change the port in the link requested in the Axios.get (line 14) to the port where the API is executing

The frontend has two important functionalities:
- It makes an API call to the GET endpoint to request the top 10 mentioned in the last section, and displays this on a list with the nickname and the score of every player, ordered by score descendantly. Also the last date when the top was requested is shown. These list and date is updated every 10 seconds by the front, making the API call every time each interval ends.
- In case there are players in the top, this can be exported as csv with a botton in the end of the page. Clicking this downloads a file in csv format, with the headers "Nickname" and "Score", and bellow these the same data that was shown in the page's list

### Execution

To execute the frontend in another terminal of the IDE and in the root folder of the project you have to run these commands :
- cd frontend (to go to the folder that has the frontend files)
- npm install
- npm start

Remember that before doing this, you must have the API in execution and on a different port than where you are trying to execute the frontend. Otherwise, this will not work properly
