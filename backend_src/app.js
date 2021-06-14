const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { getMinLoadAverage } = require("./cpu-utils");

const port = process.env.PORT || 6001;

const app = express();

const server = http.createServer(app);

const io = socketIo(server,{cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}});

let interval;

io.on("connection", (socket) => {
  const query = socket.handshake.query || {};
  const {samplingRate = 10} = query
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket),samplingRate*1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const loadTime = getMinLoadAverage();
  const time = (new Date()).getTime()
  console.log([time,loadTime],'<-----------------[time,loadTime]')
  // Emitting a new message. Will be consumed by the client
  console.log('commiting')
  socket.emit("FromAPI", [time,loadTime]);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
