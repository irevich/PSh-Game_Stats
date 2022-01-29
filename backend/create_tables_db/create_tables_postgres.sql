--Drop tables if exist

DROP TABLE IF EXISTS stat;
DROP TABLE IF EXISTS player;

--Create tables

CREATE TABLE player(
  player_id serial PRIMARY KEY,
  nickname text,
  profile_image bytea
);

CREATE TABLE stat(
  stat_id serial PRIMARY KEY,
  player integer,
  score integer,
  creation_date timestamp,
  FOREIGN KEY (player) REFERENCES player (player_id) ON DELETE CASCADE ON UPDATE CASCADE
);