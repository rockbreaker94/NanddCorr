enchant();
var SCALE = 1.439;
var WIDTH = parseInt(innerWidth/SCALE);
var HEIGHT= parseInt(innerHeight/SCALE);
var PAD_HEIGHT = HEIGHT-100;
var INVENTARIO = 0;
var PERSONAGGIO = 1;
var ABILITA = 2;
var lNomi;
var socket = io();
var inventario = new Popup();
var personaggio = new Popup();
var abilita = new Popup();
window.onunload= function(){
	socket.emit('disconnection',document.cookie.split("; ")[1].split("=")[1]);
}
window.onload = function() {
	
	document.onmouseup = docMouseUp;
    var game = new Game(WIDTH, HEIGHT);
	document.onkeydown = keyCtrl;
	game.scale = SCALE;
	var players = [];
	var stage = new Group();
	var cookies = document.cookie;
	initPopUp(inventario,personaggio,abilita);
	lNomi = new Array(1024);
	TOKEN = cookies.split("; ")[1].split("=")[1];
	NOME = cookies.split("; ")[0].split("=")[1];
	if(typeof TOKEN == "undefined"){
		alert("Devi eseguire il login per poter giocare!");
		window.location = "http://"+window.location.host;
	}
	var indicePersonale = 0;
    game.fps = 20;
    game.preload('img/map1.gif', 'img/chara0.gif','img/texture.gif');
    game.onload = function() {
        var map = new Map(16, 16);
		
        map.image = game.assets['img/map1.gif'];
		$.get('maps/m1.mdg',function(data){
			map.loadData(getMappa(data,0),getMappa(data,1));
		});                                                                                                                                                                                                                                                                                                                        
        $.get('maps/m1.mdc',function(data){
			map.collisionData=getMappa(data,0);
		});                                                                                                                                                                                                      
                                                                                                                                                                                                             
        var foregroundMap = new Map(16, 16);                                                                                                                                                                    
        foregroundMap.image = game.assets['img/map1.gif'];                                                                                                                                                      
        $.get('maps/m1.mdf',function(data){
			foregroundMap.loadData(getMappa(data,0));
		}); 
        var player = new Sprite(32, 32);
       
        var image = new Surface(96, 128);
        image.draw(game.assets['img/chara0.gif'], 0, 0, 96, 128, 0, 0, 96, 128);
        player.image = image;
		player.x = 88;
		player.y = 160;
		socket.emit('init',{x:player.x,y:player.y,tok:TOKEN,n:NOME});
		
        player.isMoving = false;
        player.direction = 0;
        player.walk = 1;
        player.addEventListener('enterframe', function() {
            this.frame = this.direction * 3 + this.walk;
            if (this.isMoving) {
				stage.removeChild(lNomi[indicePersonale]);
				lNomi[indicePersonale].x = lNomi[indicePersonale].x+this.vx;
				lNomi[indicePersonale].y = lNomi[indicePersonale].y+this.vy;
                this.moveBy(this.vx, this.vy);
				stage.addChild(lNomi[indicePersonale]);
				socket.emit('mypos',{x:this.vx,y:this.vy,i:indicePersonale,d:this.direction,f:this.frame,w:this.walk,tok:TOKEN,n:NOME});
                if (!(game.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
                }
                if ((this.vx && (this.x-8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
                    this.isMoving = false;
                    this.walk = 1;
                }
            } else {
                this.vx = this.vy = 0;
                if (game.input.left) {
                    this.direction = 1;
                    this.vx = -4;
                } else if (game.input.right) {
                    this.direction = 2;
                    this.vx = 4;
                } else if (game.input.up) {
                    this.direction = 3;
                    this.vy = -4;
                } else if (game.input.down) {
                    this.direction = 0;
                    this.vy = 4;
                }				
                if (this.vx || this.vy) {
                    var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                    var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
                    if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                        this.isMoving = true;
                        arguments.callee.call(this);
						
                    }
					checkPpCs(game,stage,player,x,y,indicePersonale);
					
                }
            }
        });
        stage.addChild(map);
		updatePos(socket,stage,lNomi,players,player,game);
		
        stage.addChild(foregroundMap);
        game.rootScene.addChild(stage);

        creazionePad(game);

        game.rootScene.addEventListener('enterframe', function(e) {
            var x = Math.min((game.width) / 2 - player.x, 0);
            var y = Math.min((game.height) / 2 - player.y, 0);
            x = Math.max(game.width/2,  x + map.width)  - map.width;
            y = Math.max(game.height, y + map.height) - map.height;
            stage.x = x;
            stage.y = y;
        });
		socket.on('init',function(pos){
		var p = JSON.parse(pos);
		player.x = p.x;
		player.y = p.y;
		indicePersonale=p.i;
		lNomi[indicePersonale] = new Label(p.n);
		lNomi[indicePersonale].color = "#FFF";
		lNomi[indicePersonale].x = player.x-18;
		lNomi[indicePersonale].y = player.y-10;
		stage.addChild(player);
		stage.addChild(lNomi[indicePersonale]);
	});
    };
    game.start();
	socket.on('positions',function(positions){
		var p = JSON.parse(positions);
		if(typeof players[p.i]==='undefined'&&indicePersonale!==p.i)
		{
			players[p.i] = null;
			players[p.i] = new Sprite(32, 32);
			players[p.i].x = p.x;
			players[p.i].y = p.y;
			var image = new Surface(96, 128);
			image.draw(game.assets['img/chara0.gif'], 0, 0, 96, 128, 0, 0, 96, 128);
			lNomi[p.i] = new Label(p.n);
			lNomi[p.i].color = "#FFF";
			lNomi[p.i].x = p.x-18;
			lNomi[p.i].y = p.y-10;
			players[p.i].image = image;
			players[p.i].isMoving = false;
			players[p.i].direction = p.d;
			players[p.i].walk = 1;
			stage.addChild(players[p.i]);
			stage.addChild(lNomi[p.i]);
		}
		else if(indicePersonale!==p.i && typeof players[p.i]!=='undefined')
		{
			players[p.i].frame = p.f;
			players[p.i].direction = p.d;
			players[p.i].isMoving = true;
			players[p.i].walk = p.w;
			stage.removeChild(lNomi[p.i]);
			lNomi[p.i].x = lNomi[p.i].x+p.x;
			lNomi[p.i].y = lNomi[p.i].y+p.y;
			players[p.i].moveBy(p.x,p.y);
			stage.addChild(lNomi[p.i]);
			players[p.i].frame = players[p.i].direction * 3 + players[p.i].walk;
		}
	});
	socket.on("error",function(error){
		alert(error);
		window.location = window.location.protocol+window.location.host+window.location.pathname;
	})
	
};