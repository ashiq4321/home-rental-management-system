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

		managerModel.updateProfile(user, function (status) {
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
	managerModel.getAllPendingCustomer(function (results) {
		if (results.length > 0) {
			res.render('manager/pendingCustomers', {
				userlist: results
			});
		} else {
			res.render('manager/pendingCustomers', {
				userlist: results
			});
		}
	});

});
router.get('/pendingHouseowners', function (req, res) {
	managerModel.getAllPendingHouseowner(function (results) {
		if (results.length > 0) {
			res.render('manager/pendingHouseowners', {
				userlist: results
			});
		} else {
			res.render('manager/pendingHouseowners', {
				userlist: results
			});
		}
	});

});
router.get('/pendingCustomers/accept/:username', function (req, res) {
	managerModel.acceptCustomer(req.params.username, function (status) {
		if (status) {
			res.redirect('/manager/pendingCustomers');
		} else {
			res.send('error');
		}
	});
});
router.get('/pendingCustomers/reject/:username', function (req, res) {
	managerModel.deleteCustomer(req.params.username, function (status) {
		if (status) {
			res.redirect('/manager/pendingCustomers');
		} else {
			res.send('error');
		}
	});
});
router.get('/pendingHouseowners/accept/:username', function (req, res) {
	managerModel.acceptHouseOwner(req.params.username, function (status) {
		if (status) {
			res.redirect('/manager/pendingHouseowners');
		} else {
			res.send('error');
		}
	});
});
router.get('/pendingHouseowners/reject/:username', function (req, res) {
	managerModel.deleteHouseOwner(req.params.username, function (status) {
		if (status) {
			res.redirect('/manager/pendingHouseowners');
		} else {
			res.send('error');
		}
	});
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