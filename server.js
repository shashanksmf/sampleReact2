var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app); 
var bodyParser = require('body-parser');
var moment = require('moment');
var localStorage = require('localStorage');
//var CryptoJS = require("crypto-js");
var CryptoJS = require("crypto-js");
var io = require('socket.io')(server);
var nodemailer = require('nodemailer');
/*var nodemailer = require('nodemailer');*/

app.use(express.static(path.join('dist')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* app.use(__dirname +'/dist/', function (req, res) {
        console.log("login all");
        res.sendFile(__dirname +'/dist/index.html');
    }); */

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/createToken',function(req,res){
    var isLoggedIn = req.body.isLoggedIn;
    var timeStamp = req.body.timeStamp;
	var isLoggedInCipher = CryptoJS.AES.encrypt(isLoggedIn, 'mySecretKey');
	var timeStampCipher = CryptoJS.AES.encrypt(timeStamp, 'mySecretKey');
   
    //var splitEnToken = deciphertext.split("-");
    //console.log("deciphertext Token : ",ciphertext);
	var userLocalStorageData = isLoggedInCipher+'split'+timeStampCipher;
	var data = (userLocalStorageData.toString());
    res.send(data);
    
})
//var currentTime =''
app.post('/validateToken',function(req,res){
    var timeStamp = req.body.timeStamp;
    var currentTime = req.body.currentTime;
 //   console.log("tokenId: ",tokenId);
    var deciphertext  = CryptoJS.AES.decrypt(timeStamp.toString(), 'mySecretKey');
    console.log("deciphertext: ",deciphertext.toString());
    var plaintextTime = deciphertext.toString(CryptoJS.enc.Utf8);
	var time = plaintextTime;
	console.log("plain text",time);
	var minutesDiff = moment(currentTime).diff(time, 'minutes');
	var secondsDiff = moment(currentTime).diff(time, 'seconds');
	console.log(" secondsDiff diff : ",secondsDiff);
	if(secondsDiff > 15000)
	{
		var userActive = 'false';
	}
	else{
		var userActive = 'true';
	}
    res.send(userActive.toString());
    
})

app.post('/getNewTimeStampToken',function(req,res){
    var timeStamp = req.body.timeStamp;
	console.log("new time stamp  ",timeStamp);
    var currentTime = req.body.currentTime;
    var encryptNewTimeStamp  = CryptoJS.AES.encrypt(timeStamp.toString(), 'mySecretKey');
   
    res.send(encryptNewTimeStamp.toString());
    
})



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.post('/getRandomPass', function(req, res) {
       // res.set('Content-Type','text');
       var customerEmailId = req.body.emailId;

       var updatePasswordLink = req.get('host')+'/changepassword';

        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var text='';
        for(var i=0; i < 10; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        //console.log("rand: ",req.body);

        console.log("password is" +text);

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://shankie1990%40gmail.com:gravityslingshot@smtp.gmail.com');

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'shankie1990@gmail.com', // sender address
            to: customerEmailId, // list of receivers
            subject: 'Your Tempoerary password Generated ✔', // Subject line
            text: text, // plaintext body
            html: 'Your Temporary password is '+text +'<div>Please go to the following link to Update your Pasword </div>'+updatePasswordLink // html body
        };

        // send mail with defined transport object
        if(customerEmailId.length>4){
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    //return console.log(error);
         //           res.send('error');
                    res.json({"data":error});
                }
                 console.log('Message sent: ' + text);
                //res.send(text);
                res.json({"data":'success',"tempPassword":text});
            });
        }

    });


var port = 3099;


server.listen(port,function(){
	
	console.log("app atarted");
}); 


io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});


io.on('sendClientTimeStamp', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});

function censor(censor) {
  var i = 0;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 

    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;  
  }
}
