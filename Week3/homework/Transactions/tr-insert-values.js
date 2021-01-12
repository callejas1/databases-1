'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password!',
  database: 'transactions',
});

const accountInfo = [
  [101, 2500],
  [102, 1750],
  [103, 1500],
  [104, 1300],
];

const transferDetails = [
  [201, 101, 0, '2021-01-11', 'Tuition Fee'],
  [202, 102, 0, '2021-01-11', 'Tuition Fee'],
];

// Insert sample data
const insertAccountDetails = `INSERT INTO account(account_number, account_balance) VALUES ?`;

connection.query(insertAccountDetails, [accountInfo], (error, results) => {
  if (error) {
    throw error;
  }
  console.log('Account details added successfully');
});

const logMoneyTransfer = `INSERT IGNORE INTO account_changes(change_number, account_number, amount, changed_date, remark) VALUES ?`;

connection.query(logMoneyTransfer, [transferDetails], (error, results) => {
  if (error) {
    throw error;
  }
  console.log('Account details added successfully');
});

connection.end();
