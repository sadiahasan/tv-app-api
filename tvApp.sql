DROP DATABASE IF EXISTS tvApp;
CREATE DATABASE tvApp;

\c tvApp;

CREATE TABLE tvShows (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  genre VARCHAR
);

CREATE TABLE users (
   ID SERIAL PRIMARY KEY, 
   email VARCHAR,
   password VARCHAR 
 );

-- CREATE TABLE toWatch{
	
-- };

-- CREATE TABLE watched{
	
-- };

INSERT INTO tvShows (name, genre)
  VALUES ('Tyler', 'Retrieved');

INSERT INTO users (email, password)
  VALUES ('bob@bob.com', 'bob');

