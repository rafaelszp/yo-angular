angular.module('ContactsApp')
	.controller('NewCtrl',function($scope, $rootScope, Contact,$location){

		$rootScope.PAGE = "new";

		$scope.contact = new Contact({
			firstName: ['','text'],
			lastName: ['','text'],
			email: ['','email'],
			homePhone: ['','tel'],
			cellPhone: ['','tel'],
			birthday: ['','date'],
			website: ['','url'],
			address: ['','text']
		});

		$scope.save = function(){
			if($scope.newContact.$invalid){
				$scope.$broadcast("record:invalid"); // informando para a app que o contato é inválido
			}else{
				$scope.contact.$save();
				$location.url('/contacts/')
			}
		}

	}); 