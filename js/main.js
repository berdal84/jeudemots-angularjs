/* Jeu de Mots by B.*/

var mainApplication = angular.module('MainApplication',[]);


/* Main Controler */

mainApplication.controller('MainController', ['$anchorScroll', '$location', '$scope', function($anchorScroll, $location, $scope) {

	$scope.websiteTitle = "RelativementUtile.fr/jeudemots";
	$scope.currentYear  = new Date().getFullYear();

	$scope.setCurrentPageId = function(s)
	{		
		$scope.currentPageId = s;
		$location.path(s).replace();
	};

	$scope.getItemClassNameWithId = function(itemPageId)
	{		
		if ( $scope.currentPageId == itemPageId)
			return "itemEnable";
		return "itemDisable";
	};
	
	/* Set an array for menu items */

	$scope.items =
	[
		{pageId:"presentation"	, label:"PRESENTATION"},
		{pageId:"today"			, label:"AUJOURD'HUI"},
		{pageId:"list"			, label:"RECHERCHER"},
		{pageId:"advises"		, label:"CONSEILS"},
		{pageId:"more"			, label:"?"}					
	];
	
	/* Set default page to today if not already defined */
	if ( $location.path() != "")
		$scope.setCurrentPageId($location.path().substr(1));
	else
		$scope.setCurrentPageId("today");

}]);


/* ServerSideDataController : to get Jokes from server side. In JSON for now but could be a database. */

mainApplication.controller('ServerSideDataController', ['$http', '$scope', function ($http, $scope) {	 
  
	$http.get("json/jokes.json").then(function(response)
	{
		console.log(response);
	  	if (response.xhrStatus == "complete"){
			if (response.status == 200){
				$scope.jokes = angular.fromJson(response.data);
				console.log("jokes.json file successfully loaded.");
			}else{
				console.log("Unable to get JSON file: ", response.statusText);
			}			
	    }else
	    	console.log("Loading JSON...");
	});

}]);