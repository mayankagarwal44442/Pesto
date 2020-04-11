var mysql = require('mysql');
var config = require("config");

var connection = mysql.createConnection({
	host: config.get("host"),
	user: config.get("user"),
	password: config.get("password"),
	database: config.get("database")
});

module.exports = connection;