const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'monsta_offline';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  console.log('Conneted to database')

  return db;
}

module.exports = main
