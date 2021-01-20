module Out2Eat{
	"use strict";
	
	routes.$inject = ["$routeProvider"]
	
	function routes($routeProvider: ng.route.IRouteProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "Out2Eat/views/home.html",
				controller: "HomeController",
				controllerAs: "home"
			})
	}
	
	angular
		.module("Out2Eat")
		.config(routes);
}