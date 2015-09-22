angular.module('FiegLayout')
	.controller('MainCtrl',function($scope,$rootScope){
		
		$scope.gotoView = function(view){
			$scope.view = "views/"+view;
		}

		$scope.$on('update-viewinfo',function(ev,obj){
			$scope.title = obj.title;
			$scope.displayInfo = obj.displayInfo;
		});

	});