//Author: Kevin Hoser

var express = require('express');
var router = express.Router();

var dbmsRouter = require('./dbms');

/*
 * Returns a JSON object with the total amount of orders for a given month, sorted by toppings
 *
 * External Reference:
 *   Determining how to query a column with a sum in the results
 *   Date: 14 February 2020
 *   URL: https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html
 */
function processOrders(req, res, next) {
  var month = req.params.month;
  var query = 'select TOPPING, SUM(QUANTITY) AS QUANTITY from ORDERS WHERE MONTH="' + month + '" GROUP BY TOPPING';
  
  dbmsRouter.dbquery(query, function(error, result) {
    res.json({"error" : error, "data" : result});
  });
}

/* POST order (JSON object). */
router.post('/:month', processOrders);

/* GET order (JSON object). */
router.get('/:month', processOrders);

module.exports = router;
