angular.module(
		"FiegLayout",
		[
			'ngRoute',
			'ngResource',
			'ngMessages'
		])
	.config(function($routeProvider,$locationProvider){

		$routeProvider.
			when('/no-page',{

			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	});