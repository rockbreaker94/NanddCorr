var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var crypto = require('crypto');
var bodyParser = require("body-parser");
var position = {};
var md5sum = crypto.createHash('md5');
var Firebase = require('firebase');
var nome = "";
var db = new Firebase("https://blinding-fire-7088.firebaseio.com/");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
var client = [];
var i = 0;
app.use(express.static(__dirname +'/public'));
app.get('/', function(req, res){
	res.sendFile("index.html",{"root":__dirname+'/public'});
});
app.get('/index.html', function(req, res){
	res.sendFile("index.html",{"root":__dirname});
});
app.post('/',function(req,resp){
	app.use(express.static(__dirname +'/public/game'));
	resp.sendFile("index.html",{"root":__dirname+'/public/game'});
});
io.on('connection', function(socket){
  socket.on('login',function(auth){
	
	var e = auth.email;
	var p = auth.pass;
	isLoginEffettuato(e,p,socket)
  });
  socket.on('reg',function(u){
	  db.createUser({
	  email    : u.email,
	  password : u.pass,
	  
	}, function(error, userData) {
	  if (error) {
		console.log("Errore mentre registravo:", error);
		socket.emit('regno',error);
	  } else {
		db.child('utenti').child(userData.uid).set({
			nome: u.nome,
			cognome: u.cognome,
			username: u.username
		});
		socket.emit('regsi',' ');
	  }
	});
	
});
  socket.on('init',function(posizione){

		position[posizione.tok] = {'x':posizione.x,'y': posizione.y,'i':i,'d':posizione.d,'n':posizione.n};
		i++;
		socket.emit('init',JSON.stringify(position[posizione.tok]));
		io.sockets.emit('position',JSON.stringify(position));
  });
  socket.on('disconnection',function(tok){
	delete position[tok];
	io.sockets.emit('position',JSON.stringify(position));
  });
  socket.on('mypos', function(mypos){
	if(typeof position[mypos.tok] != "undefined")
	{
		position[mypos.tok] = {'x':(position[mypos.tok].x+mypos.x), 'y':(position[mypos.tok].y+mypos.y),'i':mypos.i,'d':mypos.d,'f':mypos.f,'n':mypos.n};
		io.sockets.emit('positions',JSON.stringify(mypos));
	}
	else{
		socket.emit("error","Devi eseguire il login per poter giocare!");
	}
  });
});
http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:5000');
});
function isLoginEffettuato(mail,password,socket)
{
	db.authWithPassword({
	  email    : mail,
	  password : password
	}, function (error,authData){ 
		  if (error) {
			  console.error(error);
			socket.emit("login",error);
		  } else {
			db.child("utenti").child(authData.uid).child("username").on("value",function(snap){
				nome = snap.val();
				client[socket.id] = authData.token;
				authData.nome = nome;
				socket.emit("log",authData);
			});
			
		  }
	});
}