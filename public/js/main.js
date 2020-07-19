const chatForm = document.getElementById('chat-form');

let user = {
  pnombre: 'Fredy',
  papellido: 'Ballesteros',
  tiempoejer: 10,
  posicion: 0,
  tiempototal: 100,
  ronda: 0,
};

const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

socket.on('enviandoalroom', (message) => {
  console.log(message);
});

chatForm.addEventListener('submit', (e) => {
  console.log(user);

  socket.emit('peticioningresodeportista', user);
  e.preventDefault();
});
