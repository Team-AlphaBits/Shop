var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
<<<<<<< HEAD
router.get('/productform', function(req, res, next) {
  res.render('productform', { title: 'PRODUCT FORM' });
});
=======
/* GET Productform page. */
router.get('/productform', function(req, res, next) {
  res.render('productform', { title: 'PRODUCT FORM' });
});
/* GET Carousalform page. */
router.get('/carousalform', function(req, res, next) {
  res.render('carousal', { title: 'CAROUSAL FORM' });
});
>>>>>>> origin/master

module.exports = router;
