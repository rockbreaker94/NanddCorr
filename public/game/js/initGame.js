function updatePos(socket,stage,lNomi,players,player,game,ind){
	socket.on('position',function(position){
		var p = json2array(JSON.parse(position));
		for(var i=0;i<players.length;i++){
			stage.removeChild(players[i]);
			stage.removeChild(lNomi[i]);
		}
		players = [];			
		for(var i=0;i<p.length;i++)
		{
			if(p[i] !=null && ind!=p[i].i)
			{
				players[p[i].i] = null;
				players[p[i].i] = new Sprite(32, 32);
				lNomi[p[i].i] = new Label(p[i].n);
				lNomi[p[i].i].color = "#FFF";
				lNomi[p[i].i].x = p[i].x-18;
				lNomi[p[i].i].y = p[i].y-10;
				players[p[i].i].x = p[i].x;
				players[p[i].i].y = p[i].y;
				var image = new Surface(96, 128);
				image.draw(game.assets['img/chara0.gif'], 0, 0, 96, 128, 0, 0, 96, 128);
				players[p[i].i].image = image;
				players[p[i].i].isMoving = false;
				players[p[i].i].direction = p.d;
				players[p[i].i].walk = 1;
				stage.addChild(players[p[i].i]);
				stage.addChild(lNomi[p[i].i]);
			}
		}
	});
	
}
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}
function initPopUp(inventario,personaggio,abilita){
	inventario.createDiv(950,100,350,1000,"Inventario",INVENTARIO);
	inventario.setText("Oggetti");
	personaggio.createDiv(50,100,400,1000,"Personaggio",PERSONAGGIO);
	personaggio.setText("Caratteristiche");
	abilita.createDiv(50,100,400,1000,"Abilità",ABILITA);
	abilita.setText("Abilità e talenti");
}
function creazionePad(game){
	var pad = new Pad();
	pad.x = 0;
	pad.y = PAD_HEIGHT;
	game.rootScene.addChild(pad);
}