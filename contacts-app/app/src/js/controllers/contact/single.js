angular.module('ContactsApp')
	.controller('SingleCtrl',function($scope, $rootScope, $location, Contact, $routeParams){

		$rootScope.PAGE = "single";
		
		$scope.contact = Contact.get({id: parseInt($routeParams.id,10)});

		$scope.delete = function(){
			$scope.contact.$delete();
			$location.url('/contacts');
		}

		
	});