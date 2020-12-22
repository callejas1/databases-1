'use strict';

const mysql = require('mysql');
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

const aggregateFunctions = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Query execution complete', results);
  });
};

// All research papers and the number of authors that wrote that paper.
aggregateFunctions(
  'SELECT research_papers.paper_id, COUNT(author_name) FROM research_papers JOIN papers_details ON papers_details.paper_id = research_papers.paper_id JOIN authors ON authors.author_no = papers_details.author_no GROUP BY paper_id',
);

// Sum of the research papers published by all female authors.
aggregateFunctions(
  "SELECT COUNT(paper_title) FROM research_papers JOIN papers_details ON papers_details.paper_id = research_papers.paper_id JOIN authors on papers_details.author_no = authors.author_no WHERE authors.gender = 'f';",
);

// Average of the h-index of all authors per university.
aggregateFunctions(
  'SELECT university, AVG(h_index) FROM authors GROUP BY university;',
);

// Sum of the research papers of the authors per university.
aggregateFunctions(
  'SELECT authors.university, COUNT(research_papers.paper_title) AS total FROM research_papers JOIN papers_details ON research_papers.paper_id = papers_details.paper_id JOIN authors ON authors.author_no = papers_details.author_no GROUP BY authors.university;',
);

// Minimum and maximum of the h-index of all authors per university.
aggregateFunctions(
  'SELECT university, MAX(h_index) AS Max, MIN(h_index) AS Min FROM authors GROUP BY university',
);

// End connection
connection.end();
