/**
 * socket.io
 */
var io = require('socket.io')
  , validator = require('validator').sanitize
  , sqlite3 = require('./server_sqlite3');
  ;

var ssocket = exports = module.exports = {};

sqlite3.init('chachat.db');

ssocket.start = function(server){
	io = io.listen(server);

	io.sockets.on('connection', function(socket) {
		socket.on('req_open',function(data){
			var callback=function(msg){
				socket.emit('res_open',msg);
			};
			sqlite3.load(callback);
		});
		
		socket.on('req_insert',function(data){
			data.comment = validator(data.comment).entityEncode();
			data.user = validator(data.user).entityEncode();
			data.ip = socket.handshake.address.address;
			var callback=function(msg){
				socket.emit('res_insert',msg);
				socket.broadcast.emit('res_insert',msg);
			};
			sqlite3.insert(data,callback);
		});		
	});
};


