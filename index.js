const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

/*let redis_url = 'redis://127.0.0.1:6379';
let client = require('redis').createClient(redis_url);

const util = require('util');
client.hget = util.promisify(client.hget);
client.hset = util.promisify(client.hset);

const recepTiempoSockets = client.duplicate();
*/
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

let SessionWOD = '123456';
// Run when client connects
let deportistas = [];

/*
recepTiempoSockets.on('message', (channel, message) => {
  //console.log(JSON.parse(message));
  console.log('ESTE ES EL TIEMPO EN SOCKETS', message);
  io.to(SessionWOD).emit('enviandoalroom', 'HOLA ROOOM');

  //cronometro(message);
  //redisClient.hset('values', message, fib(parseInt(message)));
});

recepTiempoSockets.subscribe('tiempos');
*/
io.on('connection', (socket) => {
  //Welcome current user
  socket.emit('message', 'Welcome to chatCord');

  socket.join(SessionWOD);

  //Broadcast when a user connects
  socket.broadcast.to(SessionWOD).emit('message', 'Usuario se ha conectado');

  io.to(SessionWOD).emit('enviandoalroom', 'HOLA ROOOM');

  socket.on('peticioningresodeportista', async (msj) => {
    console.log(msj);
    deportistas.push(msj);
    console.log(deportistas);
    //await client.hset('12345', 'DEPORTISTAS', JSON.stringify(deportistas));
    io.emit('message', ' A user has left the Chat');
  });

  socket.on('disconnect', () => {
    io.emit('message', ' A user has left the Chat');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server  Sockets running on port ${PORT}`)
);
