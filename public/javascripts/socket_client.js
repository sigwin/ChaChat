$(function(){
	var $msg_user = $('input[name=user]')
	,		$msg_comment = $('input[name=comment]')
	,   $el_table = $('table#mainComment tbody')
	,		socket = io.connect()
	;

	
	socket.on('connect',function(){
		socket.emit("req_open","");
		socket.on("res_open",function(data){
			for(var key in data){
				$el_table.append(createTd(data[key]));
			}
		});
		socket.on('res_insert',function(data){
			$el_table.prepend(createTd(data));
		});
	});

	var createTd = function(row){
		var td = '<tr>';
		td += '<td class=\'name\'>' + row.user + '</td>';
		td += '<td class=\'comment\'>' + row.comment + '</td>';
		td += '<td class=\'time\'>' + row.ts + '</td>';
		td += '</tr>';
		return td;
	};

	var submit = function(){
		if($msg_comment.val().length === 0) return;
		else{
			var obj={};
			obj.user=$msg_user.val();
			obj.comment=$msg_comment.val();
			socket.emit('req_insert',obj);
			$msg_comment.val('');
		}
	};
	
	/**
	 * event handler
	 */
	// the send button is clicked
	$('button#submit').on('click',function(e){
		submit();
	});
	
	// the enter key is pressed
	$msg_comment.on('keypress',function(e){
		if(e.keyCode == 13){
			submit();
		}
	});
  /********************************************/

});

