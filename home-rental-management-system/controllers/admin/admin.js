var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

	var data = {
		name: 'admin',
		id: '22-334-3'
	};
	res.render('admin/index', data);
});
router.get('/', function (req, res) {
	res.render('admin/index');

});

router.get('/profile', function (req, res) {
	res.render('admin/profile');

});
router.get('/addNewManager', function (req, res) {
	res.render('admin/addNewManager');

});
router.get('/changeManager', function (req, res) {
	res.render('admin/changeManager');

});
router.get('/assignManager', function (req, res) {
	res.render('admin/assignManager');

});
router.get('/view_Available', function (req, res) {
	res.render('admin/view_Available');

});
router.get('/profile', function (req, res) {
	res.render('admin/profile');

});
router.get('/view_Customers', function (req, res) {
	res.render('admin/view_Customers');

});
router.get('/view_Managers', function (req, res) {
	res.render('admin/view_Managers');

});
router.get('/view_Owners', function (req, res) {
	res.render('admin/view_Owners');

});
router.get('/view_Rented', function (req, res) {
	res.render('admin/view_Rented');

});

module.exports = router;