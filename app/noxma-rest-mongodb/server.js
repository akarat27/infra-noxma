var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('sslcert/erpdev.noxma.com.key','utf8');
var certificate = fs.readFileSync('sslcert/erpdev.noxma.com.crt','utf8');
var credentials = {key: privateKey, cert: certificate};

var mongoOp     =   require("./model/mongo");
var stocktraderOp     =   require("./model/stockModel");
var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();

// app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}))

router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    return next();
});

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

router.route("/stocktrader")
    .put(function(req,res){
      var db = new stocktraderOp();
      var response = [];
      db.funds = req.body.funds;
      db.stockportfolio = req.body.stockportfolio
      db.stocks = req.body.stocks
      db.save(function(err){
          if(err) {
              response = {"error" : true,"message" : "Error adding user data " + err };
          } else {
              response = {"error" : false,"message" : "Data stocktrader added"};
          }
          res.json(response);
      });
    })
    .get(function(req,res){
        var response = {};
        stocktraderOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });
router.route("/stocktrader/remove")
    .get(function(req,res){
        var response = {};
        stocktraderOp.remove({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })

router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        console.log("Post request /users create uid " + req.body.uid + ", displayName " + req.body.displayName);
        var db = new mongoOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.uid = req.body.uid;
        db.token =  req.body.token;
	db.displayName =  req.body.displayName;
     	db.photoURL =  req.body.photoURL;
	db.email =  req.body.email;
	db.login =  req.body.login;
        db.staus =  req.body.staus; 
	db.additionalUserInfo = req.body.additionalUserInfo; 		
        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding user data " + err };
            } else {
                response = {"error" : false,"message" : "Data facebook account added"};
            }
            res.json(response);
        });
    });

router.route("/users/:uid")
    .get(function(req,res){
        console.log("Get request /users/uid " + req.params.uid )
        var response = {};
        mongoOp.find({ uid: req.params.uid },function(err,data){
        // This will run Mongo Query to fetch data based on UID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data " + err};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })


app.use('/',router);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials,app);

httpServer.listen(3000);
httpsServer.listen(3043);
// app.listen(3000);
console.log("Listening to http PORT 3000 ,https PORT 3043");
