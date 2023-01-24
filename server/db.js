const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'scrap',
  password: 'postgres',
  port: 5432
})

client.connect()
  .then(() => {
    return client.query(`CREATE TABLE IF NOT EXISTS scrap(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      time VARCHAR(100) NOT NULL,
      link VARCHAR(255) NOT NULL,
      noticeId VARCHAR(255) NOT NULL UNIQUE
    )`);
  })
  .catch(err => {
    console.log(err);
    client.end();
  });
module.exports = client