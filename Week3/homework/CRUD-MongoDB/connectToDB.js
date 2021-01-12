'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url =
  'mongodb+srv://ycallejas:maura2901@test.ubwvw.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
const database = 'new_world';

// Use connect method to connect to the server
//DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
  try {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(database);
    // City details
    const hometown = {
      Name: 'Chinandega',
      CountryCode: 'NIC',
      District: 'Chinandega',
      Population: 97387,
    };
    const hometownCollection = db.collection('City');

    // Insert into DB
    const insertCity = await hometownCollection.insertOne(hometown);
    console.log(
      `Documents added: ${insertCity.insertedCount} (${insertCity.ops[0].Name})`,
    );

    const updatePopulation = await hometownCollection.updateOne(
      { Name: 'Chinandega' },
      {
        $set: {
          Population: 134720,
        },
      },
    );
    console.log(`Documents updated: ${updatePopulation.modifiedCount}`);

    // Read the record
    const readByCity = await hometownCollection.findOne({
      Name: 'Chinandega',
    });
    const readByCountryCode = await hometownCollection.findOne({
      CountryCode: 'NIC',
    });

    console.log('Read 1st query: ', readByCity);
    console.log('Read 2nd query: ', readByCountryCode);

    // Delete record
    const deleteCity = await hometownCollection.deleteOne({
      Name: 'Chinandega',
    });

    console.log(`Documents deleted: ${deleteCity.deletedCount}`);

    // Close connection
    client.close();
  } catch (e) {
    console.error(e);
    client.close();
  }
});
