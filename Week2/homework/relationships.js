// Create another table, called Research_Papers with the following fields: (paper_id, paper_title, conference, publish_date, ...)
// What is the relationship between Authors and Research papers ? Make necessary changes to Authors and Research_Papers tables and add more tables if necessary.
// Read exercises 3 and 4 and then add information (insert rows) of 15 authors and 30 research papers such that all queries in the exercises 3 and 4 will return some answers

'use strict';

const mysql = require('mysql');
const authorValues = require('./authorDetails');
const papersTableData = require('./paperDetails');
const collaboratorsArray = require('./papersTableData');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password!',
  database: 'author_info',
});

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
    console.log('Query execution complete', results);
  });
};

// Create research_papers table
createQuery(
  'CREATE TABLE IF NOT EXISTS research_papers (paper_id INT, paper_title VARCHAR(250), conference VARCHAR(250), publish_date DATE, CONSTRAINT pk_papers PRIMARY KEY(paper_id))',
);

// Create relationship table with FKs from authors and research_papers respectively
createQuery(
  'CREATE TABLE IF NOT EXISTS papers_details (author_no INT, paper_id INT, CONSTRAINT fk_auth FOREIGN KEY (author_no) REFERENCES authors(author_no), CONSTRAINT fk_paper FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id))',
);

createQuery('SET FOREIGN_KEY_CHECKS=0;');

// Insert data into authors table: https://www.npmjs.com/package/mysql#escaping-query-values
const insertAuthors = `INSERT INTO authors (author_no, author_name, university, date_of_birth, h_index, gender, collaborator) VALUES ?`;

connection.query(insertAuthors, [authorValues], (error, results) => {
  if (error) {
    throw error;
  }
  console.log('Data inserted');
});

// Insert data into research_papers table
const insertResearchDetails = `INSERT INTO research_papers (paper_id, paper_title, conference, publish_date) VALUES ?`;

connection.query(insertResearchDetails, [papersTableData], (error, results) => {
  if (error) {
    throw error;
  }
  console.log('Paper data inserted');
});

createQuery('SET FOREIGN_KEY_CHECKS=1;');

// Insert data into papers_details table
const insertPaperDetails = `INSERT INTO papers_details (author_no, paper_id) VALUES ?`;

connection.query(insertPaperDetails, [collaboratorsArray], (error, results) => {
  if (error) {
    throw error;
  }
  console.log('Additional table data inserted');
});

createQuery('SET FOREIGN_KEY_CHECKS=1;');

// End connection
connection.end();
