const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const Notification_Controller = require('./src/Controller/notification.controller');
const MessageModel = require('./src/Model/message.model');

// Enable CORS for Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

// Enable CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

io.on('connection', (client) => {
  console.log('A user connected');
  let room;

  client.on('join', (data) => {
    room = data;
    client.join(room);
    console.log(`User joined room: ${room}`);
  });

  client.on('message', (data) => {
    console.log(data['message']);
    MessageModel.insert(data['message'], function (result) {
      console.log("Add message success");
    });
    if (data['fcm_token'] != "") {
      Notification_Controller.sendNotificationToken(data['fcm_token'], data['image'], data['message'], data['personnel_name']);
    }

    io.to(room).emit('chat message', data['message']);
    console.log(`Message received in room ${room}: ${data['message']['content']}`);
  });

  client.on('disconnect', () => {
    console.log('A user disconnected: ' + room);
    client.leave(room);
  });
});

// Your router and other configurations here
const Personnel_Router = require("./src/Router/personnel.router");
const Rollcall_Router = require("./src/Router/rollcall.router");
const Location_Router = require("./src/Router/location.router");
const Mac_Address_Router = require("./src/Router/mac_address.router");
const QR_Code_Router = require("./src/Router/qr_code.router");
const Notification_Router = require("./src/Router/notification.router");
const Break_Time_Router = require("./src/Router/break_time.router");
const Message_Router = require("./src/Router/message.router");
const Statistical_Router = require("./src/Router/statistical.router");
const Auth_Middleware = require("./src/Auth/authmiddleware");
const router = express.Router();
const Personnel_Controller = require("./src/Controller/personnel.controller");
const firebase = require("./src/Common/firebase");

router.post("/register", Personnel_Controller.create_Personnel);
router.post("/login-personnel", Personnel_Controller.login_Personnel);
app.use("/public/api", router);
app.use(Auth_Middleware.is_Auth);
app.use("/public/api", Personnel_Router);
app.use("/public/api", Notification_Router);
app.use("/public/api", Rollcall_Router);
app.use("/public/api", Location_Router);
app.use("/public/api", Mac_Address_Router);
app.use("/public/api", Message_Router);
app.use("/public/api", QR_Code_Router);
app.use("/public/api", Statistical_Router);
app.use("/public/api", Break_Time_Router);
server.listen(port, function () {
  console.log("server start on :", port);
});