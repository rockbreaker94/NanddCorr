var MapApp = angular.module("MapTool",["ngRoute"]);
MapApp.config(function($routeProvider){
	$routeProvider.when("/",{
		templateUrl: "views/home.html",
		controller: "MapController"
	}).when("/map",{	
		templateUrl: "views/map.html",
		controller: "CreateController"
	});
});
MapApp.factory("MapService",function($location){
	var texture;
	var mappa;
	var setMappa = function(map){mappa = map;};
	var setTexture = function(text){
		if(text==1){
			texture = {
				x: 962,
				y: 1538,
				xr: 960,
				yr: 1536,
				src: '../../img/map1.gif'
			};			
		}		
	};
	var getMappa = function(){return mappa;};
	var getTexture = function(){return texture;};
	var goTo = function(path){$location.path(path);};
	return{
		setTexture:setTexture,
		getTexture:getTexture,
		setMappa: setMappa,
		getMappa: getMappa,
		goTo: goTo
	};
});
MapApp.controller("MapController",function($scope,MapService){
	$scope.texture = "";
	$scope.settaTexture = MapService.setTexture;
	$scope.goTo = MapService.goTo;
});
MapApp.controller("CreateController",function($scope,MapService){
	$scope.texture = MapService.getTexture();
	$scope.goTo = MapService.goTo;
	$scope.widthQuad = 48;
	$scope.heightQuad = 48;
	$scope.isVisible = false;
	$("#text").css("width",$scope.texture.x);
	$("#text").css("height",$scope.texture.y);
	$("#text").css("background-image",'url('+$scope.texture.src+')');
	$("#text").css("background-size",'100%');
	$(".pzText").css("width",$scope.widthQuad+"px !important");
	$(".pzText").css("height",$scope.heightQuad+"px !important");
	$(".pzText").css("background-color","white");
	$scope.numQuad = new Array(($scope.texture.xr*$scope.texture.yr)/ (($scope.widthQuad)*($scope.heightQuad)));
	$scope.textAppare = function(){
		if(!$scope.isVisible){
			$scope.isVisible = true;
			//$("#tex").animate({width:"33.3333334%"});
			//$("#hide").animate({left:"33.3333334%"});
			$("#tex").css("width","20.0%");
			$("#hide").css("left","19.9%");
			$("#hide").removeClass("glyphicon-circle-arrow-right");
			$("#hide").addClass("glyphicon-circle-arrow-left");
			$("#corpo").css("left","6.3333334%");
			$("#tex").removeClass("texClose");
			$("#text").css("background-image",'url('+$scope.texture.src+')');
			$("#text").css("display","block");			
		}
		else {
			$("#tex").css("width","1.8%");
			$("#hide").css("left","0%");
			$("#hide").removeClass("glyphicon-circle-arrow-left");
			$("#hide").addClass("glyphicon-circle-arrow-right");
			$("#tex").addClass("texClose");
			$("#corpo").css("left","0%");
			$("#text").css("display","none");
			$scope.isVisible = false;
		}
	};
});