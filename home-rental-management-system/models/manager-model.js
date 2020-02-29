var db = require('./db');

module.exports = {
	getById: function (id, callback) {
		var sql = "select * from user where id=?";
		db.getResults(sql, [id], function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getAll: function (callback) {
		var sql = "select * from user";
		db.getResults(sql, null, function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	validate: function (user, callback) {
		var sql = "SELECT * FROM managerinfo where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function (results) {
			if (results.length > 0) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	getByUname: function (username, callback) {
		var sql = "select * from managerinfo where username=?";
		db.getResults(sql, [username], function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	insert: function (user, callback) {
		var sql = "insert into user values(?,?,?,?)";
		db.execute(sql, [null, user.username, user.password, user.type], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	update: function (user, callback) {
		var sql = "update managerinfo set fname=?,lname=?, username=?, password=?, email=?,phone=?,area=?,fathersName=?,nid=? where username=?";
		db.execute(sql, [user.fname, user.lname, user.username, user.password, user.email, user.phone, user.area, user.fathersName, user.nid, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	delete: function (id, callback) {
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	}
}