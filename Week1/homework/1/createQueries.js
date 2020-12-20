'use strict';

const mysql = require('mysql');

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password!',
});

// Connect
connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('Connected to the database');
});

// Create + use + insert into query reusable func.
const createQuery = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
  });
};

// Create database (if it doesn't exist -https://dev.mysql.com/doc/refman/8.0/en/create-database.html)
createQuery('CREATE DATABASE IF NOT EXISTS meetup');

// Change to meetup db
createQuery('USE meetup');

// Create table (if it doesn't exist -https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
createQuery(
  'CREATE TABLE IF NOT EXISTS Invitee(invitee_no INT, invitee_name VARCHAR(50), invited_by VARCHAR(50))',
);

// Create table called Room
createQuery(
  'CREATE TABLE IF NOT EXISTS Room(room_no INT, room_name VARCHAR(50), floor_number INT)',
);

// Create table called Meeting
createQuery(
  'CREATE TABLE IF NOT EXISTS Meeting(meeting_no INT, meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no INT)',
);

// Insert 5 rows into each table with relevant fields

// Invitee table values
createQuery(
  "INSERT INTO Invitee(invitee_no, invitee_name, invited_by) VALUES(1, 'Anthony Lopez', 'La Verde Sonrisa'), (2, 'Fre Barrios', 'El gara gara'), (3, 'Mildred Cajina', 'Teatro Nacional Ruben Dario'), (4, 'Jose Nogera', 'Magna'), (5, 'Frank Alvarez', 'Creaciones Miafersy');",
);

// Room table values
createQuery(
  "INSERT INTO Room(room_no, room_name, floor_number) VALUES(1, 'Hollywood', 2), (2, 'Multiculti', 2), (3, 'Batcave', 1), (4, 'Hall of Justice', 2), (5, 'Mos Eisley Cantina', 4);",
);

// Meeting table values
createQuery(
  "INSERT INTO Meeting(meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES(1, 'Data analysis', '2020-12-28 13:00:00', '2020-12-28 14:00:00', 101), (2, 'Risk management', '2021-01-04 10:00:00', '2021-01-04 11:30:00', 119), (3, 'Digital Go', '2021-03-03 15:30:00', '2020-03-03 15:45:00', 35), (4, 'Web Prospect', '2020-02-23 12:15:00', '2020-02-23 13:00:00', 01), (5, 'Digital Core', '2020-03-19 14:45:00', '2020-03-19 15:45:00', 20)",
);

connection.end();
