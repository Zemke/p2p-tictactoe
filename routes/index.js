
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.connect = function(req, res){
  res.render('connect');
};

exports.fields = function(req, res){
  res.render('fields');
};
