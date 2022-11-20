var express = require('express');
var router = express.Router();
var dataFile = require('../data/data.json');

/* GET data listing. */
router.get('/', function(req, res, next) {
  const {startDate , endDate} = req.query;

  let data = [...dataFile];

  if (startDate){
    data = data.filter((item) => {
      return item.date >= Number.parseInt(startDate);
    });
  }

  if (endDate){
    data = data.filter((item) => {
      return item.date<= Number.parseInt(endDate);
    });
  }

  res.json(data);
});

module.exports = router;
