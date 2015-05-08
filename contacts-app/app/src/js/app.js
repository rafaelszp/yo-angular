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
			})
			.when("/contact/:id",{
				controller: 'SingleCtrl',
				templateUrl: 'views/single.html'
			})
			.otherwise({
				redirectTo: 'contacts'
			});
			
		$locationProvider.html5Mode(true);
	});