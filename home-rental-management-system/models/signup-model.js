var db = require('./db');

module.exports = {
	insert: function (user, callback) {
		if (user.usertype == "House Provider") {
			var sql = "insert into houseownerinfo values(?,?,?,?,?,?,?,?,?,?,?)";
			db.execute(sql, [user.fname, user.lname, user.uname, user.password, user.email, user.phone, 'pending', user.fathersName, user.nid, 0, 'unblock'], function (status) {
				if (status) {
					console.log(user);
					callback(true);
				} else {
					callback(false);
				}
			});
		} else if (user.usertype == "Customer") {
			var sql = "insert into customerinfo values(?,?,?,?,?,?,?,?,?,?,?)";
			db.execute(sql, [user.fname, user.lname, user.uname, user.password, user.email, user.phone, 'pending', user.fathersName, user.nid, 0, 'unblock'], function (status) {
				if (status) {
					callback(true);
				} else {
					callback(false);
				}
			});
		} else {
			console.log("select type");
		}
	}
}