// Author: Kevin Hoser
// Adds a new order to the database

var express = require('express');
var router = express.Router();

var dbmsRouter = require('./dbms');



 /* POST order (JSON object). */
router.post('/:quantity/:topping/:notes?', function(req, res, next) {
  /*
  * External Reference:
  *   Determining how to format a month into char(3)
  *   Date: 20 February 2020
  *   URL: https://stackoverflow.com/questions/1643320/get-month-name-from-date
  */

  /*
  * External Reference:
  *   Using AUTO_INCREMENT in MYSQL to get a unique ORDERID
  *   Date: 20 February 2020
  *   URL: https://stackoverflow.com/questions/5402949/mysql-cant-make-column-auto-increment
  */
 
  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const date = new Date();
  const month = formatter.format(date).toUpperCase();
  var day = date.getDate();

  // checking for empty notes
  var notes = "";
  if (req.params.notes != null) {
    notes = req.params.notes;
  }

  var query = "insert into ORDERS (MONTH, DAY, QUANTITY, TOPPING, NOTES) values ("
    + '"' + month + '",' + day + "," + req.params.quantity + ',"' 
    + req.params.topping + '","' + notes + '")';

  console.log(query);
  dbmsRouter.dbquery(query, function(error, result) {
    res.json({"error" : error, "data" : result});
  });
});

module.exports = router;
