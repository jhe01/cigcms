var io = require('socket.io')(990);
connections = [];

io.on('connection', function(socket){
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);
	/*socket.on('bagdrop:checkin', function(data){
        socket.emit('');
    });*/
    socket.on('logged:in', function(data){
        console.log(data.data);
    });

    socket.on('bagdrop:checkin', function(data){
        socket.broadcast.emit('bagdrop checkin callback', {message: "Checkin Message", cbdata: data});
        //socket.broadcast.emit('user connected');
    });
    
	socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket), 1);
		console.log("Connected: %s sockets connected", connections.length);
	});

});

