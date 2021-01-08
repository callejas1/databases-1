'use strict';

const mysql = require('mysql');
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

const create_query = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Query execution complete -> ', results);
  });
};

// Create database
create_query('CREATE DATABASE IF NOT EXISTS author_info');

// Use it to create authors table
create_query('USE author_info');

create_query(
  "CREATE TABLE IF NOT EXISTS authors (author_no INT AUTO_INCREMENT, author_name VARCHAR(50), university VARCHAR(100), date_of_birth DATE, h_index INT, gender ENUM('m','f'), CONSTRAINT pk_author PRIMARY KEY(author_no))",
);

// Add column to hold foreign key (& set FK)
create_query(
  'ALTER TABLE authors ADD collaborator INT, ADD CONSTRAINT fk_author FOREIGN KEY (collaborator) REFERENCES authors(author_no)',
);

create_query('SET FOREIGN_KEY_CHECKS=0;');

connection.end();
