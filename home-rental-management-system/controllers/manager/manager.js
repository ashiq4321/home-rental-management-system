var express = require('express');
var router = express.Router();
var managerModel = require.main.require('./models/manager-model');

router.get('*', function (req, res, next) {
	if (req.cookies['uname'] == null) {
		res.redirect('/login');
	} else {
		next();
	}
});
router.get('/', function (req, res) {
	managerModel.getByUname(req.cookies['uname'], function (result) {
		res.render('manager/index', {
			user: result
		});
	});
});

router.get('/profile', function (req, res) {
	managerModel.getByUname(req.cookies['uname'], function (result) {
		res.render('manager/profile', {
			user: result
		});
	});

});
router.post('/profile', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			username: req.body.uname,
			fathersName: req.body.fathersName,
			email: req.body.email,
			phone: req.body.phone,
			nid: req.body.nid,
			password: req.body.password,
			area: req.body.area
		};

		managerModel.update(user, function (status) {
			console.log(user);
			if (status) {
				res.redirect('/manager');
			} else {
				res.redirect('/manager/profile');
			}
		});
	} else {
		res.send('password mismatch');
	}
});
router.get('/view_Available', function (req, res) {
	res.render('manager/view_Available');

});
router.get('/pendingCustomers', function (req, res) {
	res.render('manager/pendingCustomers');

});
router.get('/pendingHouseowners', function (req, res) {
	res.render('manager/pendingHouseowners');

});
router.get('/view_Customers', function (req, res) {
	res.render('manager/view_Customers');

});
router.get('/view_Owners', function (req, res) {
	res.render('manager/view_Owners');

});
router.get('/view_Rented', function (req, res) {
	res.render('manager/view_Rented');

});

module.exports = router;