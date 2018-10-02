const dgram = require('dgram');
const message = new Buffer('Server?');
const socket = dgram.createSocket('udp4');

socket.on('listening', function () {
	socket.setBroadcast(true);
	setInterval(() => {
		socket.send(message, 0, message.length, 5555, '255.255.255.255');
	}, 5000);
});

socket.on('message', function (message, remote) {
	console.log('CLIENT RECEIVED: ', remote.address + ':' + remote.port +' - ' + message);
});

socket.bind('8888');