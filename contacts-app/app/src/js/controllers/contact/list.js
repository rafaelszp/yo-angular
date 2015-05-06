angular.module('ContactsApp')
	.controller("ListCtrl",function($scope, $rootScope, Contact,$location){

		$rootScope.PAGE	=	"all";
		
		$scope.contacts = Contact.query();
		$scope.fields = ['firstName','lastName'];

		$scope.sort = function(field){
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;
		}

		$scope.sort.field = 'firstName';
		$scope.sort.order = false;

		$scope.show = function(id){
			$location.url('/contact/'+id);
		}

	});