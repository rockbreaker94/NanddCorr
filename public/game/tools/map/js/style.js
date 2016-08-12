function cambiaImg(ogg){
		var val = ogg.value;
		if(val==1){
			$("#imm").fadeIn();
			$("#imgtext").attr("src","../../img/map1.gif");
		}
		else{
			$("#imm").fadeOut();
		}
}