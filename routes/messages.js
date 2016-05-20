var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/receive', function(req, res, next) {
  console.log("hit endpoint");
  console.log(req);
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
