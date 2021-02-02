'use strict';

const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password!',
  database: 'transactions',
});

const conn = util.promisify(connection.query.bind(connection));

async function logMoneyTransfer() {
  try {
    await conn('START TRANSACTION;');
    await conn(
      'UPDATE account SET account_balance = account_balance - 1000 WHERE account_number = 101;',
    );
    await conn(
      'UPDATE account SET account_balance = account_balance + 1000 WHERE account_number = 102;',
    );
    await conn(
      "INSERT INTO account_changes(account_number, amount, changed_date, remark) VALUES(101, -1000, '2021-01-11', 'Tuition Fee');",
    );
    await conn(
      "INSERT INTO account_changes(account_number, amount, changed_date, remark) VALUES(102, 1000, '2021-01-12', 'Tuition Fee');",
    );
    await conn('COMMIT;');

    connection.end();
  } catch (e) {
    console.log(e);
    await conn('ROLLBACK;');

    connection.end();
  }
}
logMoneyTransfer();
