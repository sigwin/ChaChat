
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ChaChat' });
};

exports.post = function(req,res){
	console.log(req.body);
	res.render('index', { title: 'ChaChat' });
};