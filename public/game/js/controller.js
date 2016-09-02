function mouseCtrl(ogg,tit){
	document.onmousemove = function(e){
		e = e || event
		var pop = document.getElementsByClassName("popup")[ogg];
		pop.style.left = e.pageX-(tit.offsetWidth/2)+'px';
		pop.style.top = e.pageY-(tit.offsetHeight/2)+'px';
	}
}
function chiudi(ogg)
{
	if(ogg==0)
		inventario.setVisible(false);
	else if(ogg==1)
		personaggio.setVisible(false);
	else if(ogg==2)
		abilita.setVisible(false);
}
function keyCtrl(e){
		e = e || event
		if(e.keyCode==73)
		{
			if(inventario.isVisible())
				inventario.setVisible(false);
			else
				inventario.setVisible(true);
		}
		else if(e.keyCode==80)
		{
			if(personaggio.isVisible())
				personaggio.setVisible(false);
			else
				personaggio.setVisible(true);
		}
		else if(e.keyCode==65)
		{
			if(abilita.isVisible())
				abilita.setVisible(false);
			else
				abilita.setVisible(true);
		}
}
function docMouseUp(){
	document.onmousemove = null
}
function checkPpCs(game,stage,player,a,b,indicePersonale){
	if(a==328 && b==592)
	{
		//TODO: creare Mappa stanza1
		var mapStanza1 = new Map(25,25);
		mapStanza1.image = game.assets['img/texture.gif'];
		 $.get('maps/p1.mdg',function(data){
			mapStanza1.loadData(getMappa(data,0),getMappa(data,1));
		});  
		player.x = 288;
		player.y = 384;
		
		var foregroundMapStanza1 = new Map(16,16);
		var stageStanza1 = new Group();
		
		game.rootScene.removeChild(stage);
		stageStanza1.addChild(mapStanza1);
		stageStanza1.addChild(player);
		stageStanza1.addChild(foregroundMapStanza1);
		game.rootScene.addChild(stageStanza1);
		game.rootScene.addEventListener('enterframe', function(e) {
			var x = Math.min((game.width) / 2 - player.x, 0);
			var y = Math.min((game.height) / 2 - player.y, 0);
			x = Math.max(game.width/2,  x + mapStanza1.width)  - mapStanza1.width;
			y = Math.max(game.height, y + mapStanza1.height) - mapStanza1.height;
			stageStanza1.x = x;
			stageStanza1.y = y;
		});
	}
}