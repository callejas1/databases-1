'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password!',
  database: 'author_info',
});

// Connect
connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('Connected to the database');
});

const getAuthorInfo = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Query execution complete', results);
  });
};

getAuthorInfo(
  'SELECT a.author_name AS author, b.author_name as collaborator FROM authors a JOIN authors b ON b.author_no = a.collaborator;',
);

getAuthorInfo(
  'SELECT authors.*, research_papers.paper_title FROM authors JOIN papers_details ON authors.author_no = papers_details.author_no JOIN research_papers ON papers_details.paper_id = research_papers.paper_id;',
);

// End connection
connection.end();
