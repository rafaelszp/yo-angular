angular.module(
		"ContactsApp",
		[
			'ngRoute',
			'ngResource',
			'ngMessages'
		])
	.config(function($routeProvider,$locationProvider){
		$routeProvider
			.when("/contacts",{
				templateUrl: "views/list.html",
				controller: "ListCtrl"
			})
			.when("/contact/new",{
				controller: "NewCtrl",
				templateUrl: "views/new.html" 
			});
		$locationProvider.html5Mode(true);
	});