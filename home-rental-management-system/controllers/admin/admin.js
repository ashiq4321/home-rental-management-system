var express = require('express');
var router = express.Router();
var adminModel = require.main.require('./models/admin-model');
router.get('*', function (req, res, next) {
	if (req.cookies['uname'] == null) {
		res.redirect('/login');
	} else {
		next();
	}
});
router.get('/', function (req, res) {
	adminModel.getByUname(req.cookies['uname'], function (result) {
		res.render('admin/index', {
			user: result
		});
	});
});

router.get('/profile', function (req, res) {
	adminModel.getByUname(req.cookies['uname'], function (result) {
		res.render('admin/profile', {
			user: result
		});
	});

});

router.post('/profile', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			name: req.body.name,
			username: req.body.uname,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
		};

		adminModel.updateProfile(user, function (status) {
			if (status) {
				res.redirect('/admin');
			} else {
				res.redirect('/admin/profile');
			}
		});
	} else {
		res.send('password mismatch');
	}
});
router.get('/addNewManager', function (req, res) {
	var user = {
		fname: '',
		lname: '',
		username: '',
		email: '',
		phone: '',
		password: '',
		fathersName: '',
		nid: ''
	};
	res.render('admin/addNewManager', {
		user: user
	});

});
router.post('/addNewManager', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			username: req.body.uname,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
			fathersName: req.body.fathersName,
			nid: req.body.nid
		};
		adminModel.insert(user, function (status) {
			if (status) {
				res.redirect('/admin/view_managers');
			} else {
				res.render('admin/addNewManager', {
					user: user
				});
			}
		});
	} else {
		res.send('password mismatch');
	}
});
router.get('/view_Managers', function (req, res) {
	adminModel.getAllManager(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Managers', {
				userlist: results
			});
		} else {
			res.render('admin/view_Managers', {
				userlist: results
			});
		}
	});

});
router.get('/view_Owners', function (req, res) {
	adminModel.getAllOwners(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Owners', {
				userlist: results
			});
		} else {
			res.render('admin/view_Owners', {
				userlist: results
			});
		}
	});

});
router.get('/view_Customers', function (req, res) {
	adminModel.getAllCustomers(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Customers', {
				userlist: results
			});
		} else {
			res.render('admin/view_Customers', {
				userlist: results
			});
		}
	});

});

router.get('/view_Owners/:username', function (req, res) {
	adminModel.getOwnersProfile(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'houseownerinfo'
		});
	});

});
router.get('/view_Managers/:username', function (req, res) {
	adminModel.getManagerProfile(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'managerinfo'
		});
	});

});

router.get('/view_Customers/:username', function (req, res) {
	adminModel.getCutomerProfile(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'customerinfo'
		});
	});

});
//block unblock
router.get('/managerinfo/:username', function (req, res) {
	adminModel.getManagerProfile(req.params.username, function (result) {
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
		adminModel.managerStatus(user, function (status) {
			if (status) {
				adminModel.getManagerProfile(req.params.username, function (result) {
					res.render('admin/getProfile', {
						user: result,
						table: 'managerinfo'
					});
				});
			} else {
				res.send('error');
			}
		});

	});
});
router.get('/houseownerinfo/:username', function (req, res) {
	adminModel.getOwnersProfile(req.params.username, function (result) {
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
		adminModel.houseOwnersStatus(user, function (status) {
			if (status) {
				adminModel.getOwnersProfile(req.params.username, function (result) {
					res.render('admin/getProfile', {
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
	adminModel.getCutomerProfile(req.params.username, function (result) {
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
		adminModel.customerStatus(user, function (status) {
			if (status) {
				adminModel.getCutomerProfile(req.params.username, function (result) {
					res.render('admin/getProfile', {
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
router.get('/view_Available', function (req, res) {
	adminModel.getAllAvailableHouse(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Available', {
				userlist: results
			});
		} else {
			res.render('admin/view_Available', {
				userlist: results
			});
		}
	});

});
router.get('/view_Rented', function (req, res) {
	adminModel.getAllRentedHouse(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Rented', {
				userlist: results
			});
		} else {
			res.render('admin/view_Rented', {
				userlist: results
			});
		}
	});

});
router.get('/assignManager', function (req, res) {
	adminModel.getAllManager(function (results) {
		if (results.length > 0) {
			res.render('admin/assignManager', {
				userlist: results
			});
		} else {
			res.render('admin/assignManager', {
				userlist: results
			});
		}
	});

});
router.post('/assignManager', function (req, res) {
	var user = {
		username: req.body.username,
		division: req.body.division,
		area: req.body.area,
	};

	adminModel.assignManagerarea(user, function (status) {
		if (status) {
			res.redirect('/admin/view_Managers');
		} else {
			res.redirect('/admin/assignManager');
		}
	});
});

router.get('/changeManager', function (req, res) {
	res.render('admin/changeManager');

});
router.get('/view_Rented', function (req, res) {
	res.render('admin/view_Rented');

});

module.exports = router;