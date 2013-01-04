/**
 * sqlite3
 */
var sqlite3 = require("sqlite3").verbose();
var ssqlite3 = exports = module.exports = {};
var db;

var db_name;


ssqlite3.init = function(db_name){
	this.db_name=db_name;
};

ssqlite3._start = function(){
	db = new sqlite3.Database(this.db_name,this._createTable);
};

ssqlite3._createTable=function(){
	db.run("CREATE TABLE IF NOT EXISTS message("
				 + "id INTEGER PRIMARY KEY,"
				 + "ip TEXT,"
				 + "user TEXT,"
				 + "comment TEXT,"
				 + "ts TIMESTAMP DEFAULT (DATETIME('now','localtime')));"
				 );
};

ssqlite3.insert = function(data,callback){
	var me = this;
	me._start();
	db.run("INSERT INTO message('ip','user','comment') values('"
				 + data.ip + "','"
				 + data.user + "','"
				 + data.comment + "' )");
	
	var obj={};
	db.each("SELECT * FROM message where rowid=last_insert_rowid();"
					,function(err,row){
		obj.user=row.user;
		obj.comment=row.comment;
		obj.ts=row.ts;
	},function(){
		me._close();
		callback(obj);
	});
};

ssqlite3.load = function(callback){
	var me = this;
	me._start();
	var msg = [];
	db.each("SELECT * FROM message ORDER by ts DESC LIMIT 100;",function(err,row){
		var obj = {};
		obj.user=row.user;
		obj.comment=row.comment;
		obj.ts=row.ts;
		msg[msg.length]=obj;
	},function(){
		me._close();
		callback(msg);
	});
};


ssqlite3.count = function(){
	var me = this;
	me._start();
	var count=0;
	db.each("SELECT count(id) FROM message;",function(err,row){
		count = row['count(id)'];
	},function(){
		me._close();
		return count;
	});
};

ssqlite3._close = function(){
	db.close();
};
