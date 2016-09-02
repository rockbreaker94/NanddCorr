function goTo(str){
		if(str==='mappa')
			window.location = "game/tools/map/";
	}
jQuery.get('version.txt', function(data) {
		$("#vers").html("<p>"+data+"</p>");
	});
$(window).ready(function(){
	
	var socket = io();
	
	$( "#butt" ).click(function() {
		$('#msg').css("display","none");
		var mail = $("#mail").val();
		var passw = md5($("#pass").val());
		socket.emit("login",{email:mail,pass:passw});
	});	
	socket.on('login', function(msg){
		var messaggio="";
		switch(msg.code){
			case INVALID_PASSWORD: 
				messaggio = "Username e/o Password errati!";
				break;
		}
		$('#msg').text(messaggio);
		$('#msg').css("display","block");
	 });
	socket.on('log',function(map){
		TOKEN=map.token;
		NOME=map.nome;
		document.cookie="NOME="+map.nome;
		document.cookie="TOKEN="+map.token;
		$("#formlog").submit();
	});
	socket.on('regsi',function(){
		$("#caricamento").css("display","none");
		$("#regis").fadeOut();
		$("#reg").fadeOut();
		$("#status").css("display","block");
	});
	socket.on('regno',function(msgErrore){
		$("#caricamento").css("display","none");
		var messaggio = "";
		switch(msgErrore.code){
			case EMAIL_REGISTRATA:
				messaggio= "Email già registrata! Recupera la tua password";
			
		}
		$("#status").text("Errore nella registrazione: "+messaggio);
		$("#status").css("display","block");
		$("#status").css("color","red");
	})
	$("#reg").click(function(){
		$("#caricamento").css("display","inline-block");
		var user = $("#usern").val();
		var pass = md5($("#passw").val());
		var email = $("#email").val();
		var nome = $("#nome").val();
		var cognome = $("#cognome").val();
		socket.emit('reg',{nome:nome, cognome:cognome, email:email, username:user, pass:pass});
	});
});