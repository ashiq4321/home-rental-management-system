var express = require('express');
var router = express.Router();
var signupModel = require.main.require('./models/signup-model');
router.get('/', function (req, res) {
	var user = {
		fname: '',
		lname: '',
		uname: '',
		password: '',
		fathersName: '',
		email: '',
		phone: '',
		nid: '',
		password: ''
	};
	res.render('signup/index', {
		user: user
	});
});

router.post('/', function (req, res) {
	if (req.body.cpassword == req.body.password) {
		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			uname: req.body.uname,
			usertype: req.body.usertype,
			password: req.body.password,
			fathersName: req.body.fathersName,
			email: req.body.email,
			phone: req.body.phone,
			nid: req.body.nid
		};
		signupModel.insert(user, function (status) {
			if (status) {
				res.render('signup/success');
			} else {
				res.render('signup/index', {
					user: user
				});

			}
		});
	} else {
		res.send('password mismatch');
	}
});
module.exports = router;