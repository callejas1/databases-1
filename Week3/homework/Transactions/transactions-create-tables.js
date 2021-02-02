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

const createQuery = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Query execution complete -> ', results);
  });
};

// Create DB for account and account_changes table
createQuery('CREATE DATABASE transactions');

// Use newly created DB
createQuery('USE transactions');

// Create account & account_changes table
createQuery(
  'CREATE TABLE IF NOT EXISTS account(account_number int Primary Key, account_balance FLOAT)',
);

createQuery(
  'CREATE TABLE IF NOT EXISTS account_changes(change_number int IDENTITY(1,1) Primary Key, account_number int, CONSTRAINT fk_acct_no Foreign Key(account_number) REFERENCES account(account_number), amount FLOAT, changed_date DATE, remark VARCHAR(250))',
);

connection.end();
