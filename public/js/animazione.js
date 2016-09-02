$(window).ready(function(){

	$("#log").click(function(){
		if($("#formlog").is(':visible')){
			$("#log").css("transform","rotate(0deg)");
			$(".loggin").css("width","3%");
			$("#butt").css("display","none");
			$("#formlog").css("display","none");
			$("#submenu").css("display","none");
			$("body").css("background-color","#eee");
			$(".init").css("opacity","1");
			$(".loggin").css("height","auto");
			$(".init input").prop("disabled",false);
			$("#vers").css("display","none");
		}
		else{
			$(".loggin").css("height","100%");
			$(".loggin").css("width","25%");
			$("#butt").css("display","block");
			$("body").css("background-color","#000");
			$(".init").css("opacity","0.4");
			$("#formlog").delay(1000).css("display","block");
			$("#submenu").delay(1000).css("display","block");
			$("#log").css("transform","rotate(180deg)");
			$(".init input").prop("disabled",true);
			$("#vers").delay(1000).css("display","block");
		}
		
	});
});