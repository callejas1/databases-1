'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password!',
  database: 'new_world',
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('Connected to the database');
});

const world_DB = (q, query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Q: ', q);
    console.log('A: ', results, '\n');
  });
};

// 1- Names of countries with population greater than 8 million?
world_DB(
  'What are the names of countries with population greater than 8 million?',
  'SELECT name FROM country WHERE Population > 8000000',
);

// 2- Names of countries that have “land” in their names
world_DB(
  'What are the names of countries that have “land” in their names?',
  "SELECT name FROM country WHERE name LIKE '%land%'",
);

// 3- Names of the cities with population in between 500,000 and 1 million
world_DB(
  'What are the names of the cities with population in between 500,000 and 1 million?',
  'SELECT name FROM city WHERE Population BETWEEN 500000 AND 1000000',
);

// 4- Name of all the countries on the continent ‘Europe’
world_DB(
  "What's the name of all the countries on the continent ‘Europe’?",
  "SELECT name FROM country WHERE Continent = 'Europe'",
);

// 5- List all the countries in the descending order of their surface areas.
world_DB(
  'List all the countries in the descending order of their surface areas.',
  'SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC',
);

// 6- Names of all the cities in the Netherlands
world_DB(
  'What are the names of all the cities in the Netherlands?',
  "SELECT name FROM city WHERE CountryCode = 'NLD'",
);

// 7- Population of Rotterdam
world_DB(
  'What is the population of Rotterdam?',
  "SELECT name, population FROM city WHERE city.name = 'Rotterdam'",
);

// 8- Top 10 countries by Surface Area
world_DB(
  "What's the top 10 countries by Surface Area?",
  'SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10',
);

// 9- Top 10 most populated cities
world_DB(
  "What's the top 10 most populated cities?",
  'SELECT name, Population FROM city ORDER BY Population DESC LIMIT 10',
);

// 10- Population number of the world
world_DB(
  'What is the population number of the world?',
  'SELECT SUM(Population) FROM country',
);

connection.end();
