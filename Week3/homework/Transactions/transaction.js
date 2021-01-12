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
      "UPDATE account_changes SET amount = -1000, changed_date = '2021-01-12', remark = 'Tuition Fee' WHERE change_number = 201;",
    );
    await conn(
      "UPDATE account_changes SET amount = 1000, changed_date = '2021-01-12', remark = 'Tuition Fee' WHERE change_number = 202;",
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
