angular.module('FiegLayout')
	.controller('PessoaCtrl',function($scope,$rootScope){


		$scope.pessoa = {
			nome: ['','text'],
			email: ['','email'],
			endereco: ['','text'],
			homepage: ['','url'],
			cpf:['','text']
		};

		$scope.$emit('update-viewinfo',{
			title:'Incluir pessoa',
			displayInfo: undefined,
		});

		$scope.save = function(){

			if($scope.formPessoa.$invalid){
				$scope.$broadcast("record:invalid");
			}else{
				console.log("salvando",$scope.pessoa);
			}

		}

	});