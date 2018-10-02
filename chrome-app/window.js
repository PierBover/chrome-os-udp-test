// https://developer.chrome.com/apps/sockets_udp
var socket = chrome.sockets.udp;
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var messageBuffer = encoder.encode('Server are you there?');

socket.create({}, function(socketInfo) {
	console.log('socketInfo', socketInfo);

	// https://developer.chrome.com/apps/sockets_udp#method-bind
	socket.bind(socketInfo.socketId, '0.0.0.0', 0, function(connectResult) {
		console.log('connectResult', connectResult);

		socket.setBroadcast(socketInfo.socketId, true, (result) => {
			setInterval(() => {
				// https://developer.chrome.com/apps/sockets_udp#method-send
				socket.send(socketInfo.socketId, messageBuffer, '255.255.255.255', 5555, function(sendResult) {
					console.log('sendResult', sendResult);
				});
			}, 3000);
		});

		socket.onReceive.addListener(function (response) {
			console.log('onReceive', response);
			console.log('Server address:', response.remoteAddress);
			console.log('Server said:', decoder.decode(response.data));
		});
	});
});