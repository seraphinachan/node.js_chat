const { Socket } = require("engine.io");
const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")
const moment = require("moment-timezone")

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5000;

io.on("connection",(socket)=>{
    socket.on("chatting", (data) => {
        const { name, message } = data;
        const time = moment().tz('Asia/Seoul').format("h:mm A");
        io.emit("chatting", {
            name: name,
            message: message,
            time: time
        })
    })
})

server.listen(PORT, () => console.log(`server is running ${PORT}`))