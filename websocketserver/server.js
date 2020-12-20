const { data } = require("autoprefixer");

const httpServer = require("http").createServer((req, res) => {});

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", function(socket) {
    console.log("User connected");
    socket.emit("id", socket.id);

    //createRoom function
    socket.on("createRoom", room => {
        socket.join(room);
    });

    //joinRoom function
    socket.on("joinRoom", (room, id) => {
        if ([...io.sockets.adapter.rooms.keys()].indexOf(room) >= 0) {
            socket.join(room);
            socket.to(room).emit("createPeer", { socketIdSender: id, room: room });
        } else socket.emit("error", { error: 404, errorMessage: "Room not found" });
    });

    socket.on("offer", dataOffer => {
        if (dataOffer.offer && dataOffer.socketIdSender && dataOffer.socketIdReceiver && dataOffer.room) {
            socket.to(dataOffer.room).emit("offer", {
                socketIdSender: dataOffer.socketIdSender,
                socketIdReceiver: dataOffer.socketIdReceiver,
                offer: dataOffer.offer,
                room: dataOffer.room,
            });
        }
    });

    socket.on("answer", dataAnswer => {
        if (dataAnswer.answer && dataAnswer.socketIdSender && dataAnswer.socketIdReceiver && dataAnswer.room)
            socket.to(dataAnswer.room).emit("answer", {
                socketIdSender: dataAnswer.socketIdSender,
                socketIdReceiver: dataAnswer.socketIdReceiver,
                answer: dataAnswer.answer,
            });
    });

    //close the connection
    socket.on("close", function() {
        console.log("Disconnecting user");
    });
});

httpServer.listen(8888, () => {
    console.log("go to ws://localhost:8888");
});