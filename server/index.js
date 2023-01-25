const express = require('express');
const app = express();
const server = require('http').Server(app);
const db = require('./db');
const scrapData = require('./scrap')

const io = require('socket.io')(server, {
  cors: { origin: '*' }
});


io.on('connection', socket => {
  socket.on('getData', async () => {

    const query = await db.query('SELECT * from scrap ORDER BY id DESC LIMIT 1')
    const data = query.rows[0]

    socket.emit('data', data);
  });

});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

setInterval(async ()=>{
 await scrapData()
},3000);
