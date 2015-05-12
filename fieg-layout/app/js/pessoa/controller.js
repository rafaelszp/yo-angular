angular.module('FiegLayout')
	.controller('PessoaCtrl',function($scope){

		$scope.pessoa = {
			nome: ['','text'],
			email: ['','email'],
			endereco: ['','text'],
			homepage: ['','url']
		};

		$scope.save = function(){


			if($scope.formPessoa.$invalid){
				$scope.$broadcast("record:invalid");
			}else{
				console.log("salvando",$scope.pessoa);
			}

		}

	});