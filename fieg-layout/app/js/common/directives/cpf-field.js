angular.module('FiegLayout')
.directive('cpfField',function(){
	return {
		restrict: 'EA',
		templateUrl: 'views/templates/cpf-field.html',
		replace: true,
		scope: {
			record: '=',
			field: '@',
			live: '@',
			label: '@',
			type: '@',
			required: '@'
		},
		link: function($scope,element,attr,ctrl){


			$scope.$on('record:invalid',function(){
				$scope[$scope.field].$setDirty();
			});

			$scope.limpar = function(field) {

				if(!$scope.record){
					$scope.record={};
					$scope.record[field]=[null,$scope.type];
				}

				if($scope.record[field]){
					$scope.record[field][0] = null;
				}

			};

		}
	};
})
.directive('ngCpf',function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attr, ctrl) {

			function cpfValidator(ngModelValue){
				
				cpf = ngModelValue;
				pattern = /\d{3}\.\d{3}\.\d{3}\-\d{2}/g;

				if(!cpf.match(pattern)){
					ctrl.$setValidity('cpfValidator',false);
				}else{
					ctrl.$setValidity('cpfValidator',true);
				}

				if(!validarCPF(cpf)){
					ctrl.$setValidity('digitoVerificador',false);	
				}else{
					ctrl.$setValidity('digitoVerificador',true);	
				}

				return cpf;
			}

			function validarCPF(cpf) {  
							cpf = cpf.replace(/[^\d]+/g,'');    
							if(cpf == '') return false; 
			    // Elimina CPFs invalidos conhecidos    
			    if (cpf.length != 11 || 
			    	cpf == "00000000000" || 
			    	cpf == "11111111111" || 
			    	cpf == "22222222222" || 
			    	cpf == "33333333333" || 
			    	cpf == "44444444444" || 
			    	cpf == "55555555555" || 
			    	cpf == "66666666666" || 
			    	cpf == "77777777777" || 
			    	cpf == "88888888888" || 
			    	cpf == "99999999999")
			    	return false;       
			    // Valida 1o digito 
			    add = 0;    
			    for (i=0; i < 9; i ++)       
			    	add += parseInt(cpf.charAt(i)) * (10 - i);  
			    rev = 11 - (add % 11);  
			    if (rev == 10 || rev == 11)     
			    	rev = 0;    
			    if (rev != parseInt(cpf.charAt(9)))     
			    	return false;       
			    // Valida 2o digito 
			    add = 0;    
			    for (i = 0; i < 10; i ++)        
			    	add += parseInt(cpf.charAt(i)) * (11 - i);  
			    rev = 11 - (add % 11);  
			    if (rev == 10 || rev == 11) 
			    	rev = 0;    
			    if (rev != parseInt(cpf.charAt(10)))
			    	return false;       
			    return true;   
			}

ctrl.$parsers.push(cpfValidator);

}
};
});