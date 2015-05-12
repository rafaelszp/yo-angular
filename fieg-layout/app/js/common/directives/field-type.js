angular.module('FiegLayout')
	.value("FieldTypes",{
		text:  		['Text','deve ser um texto válido'],
		email: 		['Email','deve ser um endereço de e-mail válido'],
		number: 	['Number','deve ser um número válido'],
		date: 		['Date',' deve ser uma data válida DD/MM/YYYY'],
		datetime: 	['DateTime','deve ser uma data/hora válida DD/MM/YYYY HH:mm:SS'],
		time: 		['Time','deve ser uma hora válida HH/mm/SS'],
		month: 		['Month','deve ser um mês válido(1-12)'],
		week: 		['Week','deve ser um dia da semana válido(1-7)'],
		url: 		['URL','deve ser uma URL válida'],
		tel: 		['Phone Number','deve ser um número de telefone válido'],
		color: 		['Color','deve ser uma cor válida'],
	});