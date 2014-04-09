
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.connect = function(req, res){
  res.render('connect');
};

exports.playing = function(req, res){
  res.render('playing');
};

exports.error = function(req, res){
  res.render('error');
};
