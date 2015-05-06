angular.module('ContactsApp')
	.value("FieldTypes",{
		text:  		['Text','deve ser um texto válido'],
		email: 		['Email','deve ser um endereço de e-mail'],
		number: 	['Number','deve ser um número válido'],
		date: 		['Date',' deve ser uma data válida DD/MM/YYYY'],
		datetime: 	['DateTime','deve ser uma data/hora válida DD/MM/YYYY HH:mm:SS'],
		time: 		['Time','deve ser uma hora válida HH/mm/SS'],
		month: 		['Month','deve ser um mês válido(1-12)'],
		week: 		['Week','deve ser um dia da semana válido(1-7)'],
		url: 		['URL','deve ser uma URL válida'],
		tel: 		['Phone Number','deve ser um número de telefone válido'],
		color: 		['Color','deve ser uma cor válida'],
	})
	.directive('formField',function($timeout,FieldTypes){
		return {
			restrict: 'EA', //Element or Attribute
			templateUrl:  'views/templates/form-field.html',
			replace: true,
			scope: {
				record: '=', //two way binding for record
				field: '@', //one way binding
				live: '@',
				required: '@'
			},
			link: function($scope,element,attr){
				
				$scope.$on('record:invalid',function(){
					$scope[$scope.field].$setDirty();
				});

				$scope.types = FieldTypes;
				
				$scope.remove = function(field){
					delete $scope.record[field];
					$scope.blurUpdate();
				}
 
				$scope.blurUpdate = function (){
					if($scope.live !== 'false'){
						$scope.record.$update(function (updatedRecord) {
							$scope.record = updatedRecord;
						});
					};
				}

				var saveTimeout;
				$scope.update = function(){
					$timeout.cancel(saveTimeout);
					saveTimeout = $timeout($scope.blurUpdate,1000);
				}



			}
		};
	})
	.directive('newField',function($filter, FieldTypes){
		return {
			restrict: 'EA',
			templateUrl: 'views/templates/new-field.html',
			replace: true,
			scope: {
				record: '=',
				live: '@'
			},
			require: '^form',
			link: function($scope,element,attr,form){

				$scope.types = FieldTypes;
				$scope.field = {};

				$scope.show = function(type){
					$scope.field.type 	= type;
					$scope.display 		= true;
				};

				$scope.remove = function(){
					$scope.field 	= {};
					$scope.display 	= false;
				};

				$scope.add = function(){
					if(form.newField.$valid){
						$scope.record[$filter('camelCase')($scope.field.name)] = [$scope.field.value,$scope.field.type];
						$scope.remove();

						if($scope.live !== 'false'){
							$scope.record.$update(function (updatedRecord) {
								$scope.record = updatedRecord;
							});
						}

					}
				};
			}
		};
	});