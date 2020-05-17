require('dotenv').config();
const app = require('./app');

const server = app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}`));

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', msg => {
    io.emit('message', msg);
  });
});