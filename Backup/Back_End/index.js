var express = require('express');
var app = express();
var cors = require('cors');
var url = require('url');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
//run before other middlewares

app.use(cors());

var connection = require("./Mysql/connect_db");
connection.connect();


app.get('/', function (req, res) {
    let q = url.parse(req.url, true);
    var qdata = q.query;
    console.log(qdata.name);

	connection.query("select pestos from user_pestos where username=\"" + qdata.name + "\"" , function(err, rows, fields){
		if(err) throw err;
		console.log(JSON.stringify(rows[0]));
		res.send(JSON.stringify(rows[0]));
	}); 

});

app.post('/', function(req, res){   //in body, you will have the username and tweet. Add to followers
    console.log(req.body);
});

var server = app.listen(2000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("app listening at http://%s:%s", host, port);
})
