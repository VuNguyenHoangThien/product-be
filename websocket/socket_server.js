// // var http = require('http');
// // const Express = require("express");

// // var app = Express();
// // var cors = require('cors');
// // app.use(cors({ origin: true, credentials: true }));

// //     var server = http.Server(app);


// //     var io = require('socket.io').listen(server);

// //     // function sendTime() {
// //     //     io.emit('time', { time: new Date().toJSON() });
// //     // }

// //     // setInterval(sendTime, 10000);

// //      io.on('connection', function(socket) {
// //     socket.emit('welcome', { message: 'Welcome!', id: socket.id });
// //     socket.on('i am client', console.log);
// // });

// // server.listen(8000);
// // //  }
// 'use strict';

// (function () {
//     let io;
//     var http = require('http');
//     const Express = require("express");
//     var app = Express();
//     var cors = require('cors');
//     app.use(cors({ credentials: true, origin: 'http://localhost:4200/dashboard'}));

//     module.exports.socket = () => {
//         var server = http.createServer(app);
    
//         io = require('socket.io')(server);
    
//         io.on('connection', function (socket) {
//             console.log("controller");
//             socket.emit('event', {
//                 message: 'welcome to websocket'
//             });
//         })
//         // const PORT = process.env.SOCKET || 8000;

//         const PORT = 8000;

//         console.log(PORT);
//     server.listen(PORT);
//         return io;
//     }
// }())
