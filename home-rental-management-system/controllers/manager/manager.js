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
	managerModel.getAllAvailableCustomer(function (results) {
		if (results.length > 0) {
			res.render('manager/view_Customers', {
				userlist: results
			});
		} else {
			res.render('manager/view_Customers', {
				userlist: results
			});
		}
	});

});
router.get('/view_Owners', function (req, res) {
	managerModel.getAllAvailableHouseowner(function (results) {
		if (results.length > 0) {
			res.render('manager/view_Owners', {
				userlist: results
			});
		} else {
			res.render('manager/view_Owners', {
				userlist: results
			});
		}
	});

});
router.get('/view_Customers/:username', function (req, res) {
	managerModel.getCutomerProfile(req.params.username, function (result) {
		res.render('manager/getProfile', {
			user: result,
			table: 'customerinfo'
		});
	});

});
router.get('/view_Owners/:username', function (req, res) {
	managerModel.getOwnersProfile(req.params.username, function (result) {
		res.render('manager/getProfile', {
			user: result,
			table: 'houseownerinfo'
		});
	});

});
//block unblock
router.get('/houseownerinfo/:username', function (req, res) {
	managerModel.getOwnersProfile(req.params.username, function (result) {
		if (result.status == "block") {
			var user = {
				username: req.params.username,
				status: 'unblock'
			};
		} else {
			var user = {
				username: req.params.username,
				status: 'block'
			};
		}
		managerModel.houseOwnersStatus(user, function (status) {
			if (status) {
				managerModel.getOwnersProfile(req.params.username, function (result) {
					res.render('manager/getProfile', {
						user: result,
						table: 'houseownerinfo'
					});
				});
			} else {
				res.send('error');
			}
		});

	});
});
router.get('/customerinfo/:username', function (req, res) {
	managerModel.getCutomerProfile(req.params.username, function (result) {
		if (result.status == "block") {
			var user = {
				username: req.params.username,
				status: 'unblock'
			};
		} else {
			var user = {
				username: req.params.username,
				status: 'block'
			};
		}
		managerModel.customerStatus(user, function (status) {
			if (status) {
				managerModel.getCutomerProfile(req.params.username, function (result) {
					res.render('manager/getProfile', {
						user: result,
						table: 'customerinfo'
					});
				});
			} else {
				res.send('error');
			}
		});

	});
});
router.get('/view_Rented', function (req, res) {
	managerModel.getAllRentedHouse(function (results) {
		if (results.length > 0) {
			res.render('manager/view_Rented', {
				userlist: results
			});
		} else {
			res.render('manager/view_Rented', {
				userlist: results
			});
		}
	});

});
router.get('/view_Available', function (req, res) {
	managerModel.getAllAvailableHouse(function (results) {
		if (results.length > 0) {
			res.render('manager/view_Available', {
				userlist: results
			});
		} else {
			res.render('manager/view_Available', {
				userlist: results
			});
		}
	});

});
router.get('/view_Rented/:id', function (req, res) {
	managerModel.deleteHouse(req.params.id, function (status) {
		if (status) {
			res.redirect('/manager/view_Rented');
		} else {
			res.send('error');
		}
	});
});
router.get('/view_Available/:id', function (req, res) {
	managerModel.deleteHouse(req.params.id, function (status) {
		if (status) {
			res.redirect('/manager/view_Available');
		} else {
			res.send('error');
		}
	});
});
module.exports = router;