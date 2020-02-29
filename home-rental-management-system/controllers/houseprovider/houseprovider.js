var express = require('express');
var router = express.Router();

router.post('/', function(req, res){

	var data ={
		name: 'admin',
		id: '22-334-3'
	};	
	res.render('houseprovider/index', data);
});

module.exports = router;