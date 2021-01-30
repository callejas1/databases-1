'use strict';

const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password!',
  database: 'new_world',
  multipleStatements: true,
});

// Connect
conn.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('Connected to the database');
});

// Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)

// function getPopulation(Country, name, code, cb) {
//   // assuming that connection to the database is established and stored as conn
//   conn.query(
//     `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
//     function (err, result) {
//       // if (err) cb(err);
//       // if (result.length == 0) cb(new Error('Not found'));
//       cb(null, result); //[0].name);
//     },
//   );
// }
// // If query "SELECT Population FROM Country WHERE Name = 'Nicaragua' AND code = 'NIC' OR 1=1" is entered in the terminal || MySQL workbench then 239 rows are displayed in the results set.
// // Does not display the same when done in Node.js. Thoughts?
// getPopulation('Country', 'Nicaragua', "'NIC' OR 1=1", (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(`Population: ${result}`);
// });

// Rewrite the function so that it is no longer vulnerable to SQL injection
// https://github.com/mysqljs/mysql#preparing-queries
function getPopulation(name, code, cb) {
  conn.query(
    `SELECT Population FROM Country WHERE Name = ? and code = ?`,
    [name, code],
    (err, result) => {
      if (err) {
        cb(err);
      }
      if (result.length == 0) {
        cb(new Error('Not found'));
      }
      cb(null, result[0].Population);
    },
  );
}

getPopulation('Nicaragua', 'NIC', (e, results) => {
  if (e) throw e;
  console.log(`Population: ${results}`);
});

// End connection
conn.end();
