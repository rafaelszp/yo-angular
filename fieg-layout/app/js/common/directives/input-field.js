angular.module('FiegLayout')
	.directive('inputField', function($timeout,FieldTypes){
		return {
			restrict: 'EA',
			templateUrl: 'views/templates/input-field.html',
			replace: true,
			scope: {
				record: '=', 
				field: '@',
				live: '@',
				label: '@',
				type: '@',
				required: '@'
			},
			link: function($scope,element,attr){

				$scope.types = FieldTypes;

				$scope.$on('record:invalid',function(){
					$scope[$scope.field].$setDirty();
				});
				
				$scope.limpar = function(field){

					if(!$scope.record){
						$scope.record={};
						$scope.record[field]=[null,$scope.type];
					}

					if($scope.record[field]){
						$scope.record[field][0] = null;
					}
					
				}

				$scope.update = function (){
					if($scope.live !== 'false'){
						$scope.record.$update(function (updatedRecord) {
							$scope.record = updatedRecord;
						});
					};
				}

				var saveTimeout;
				$scope.blurUpdate = function(){
					$timeout.cancel(saveTimeout);
					saveTimeout = $timeout($scope.blurUpdate,1000);
				}


			}
		};
	});