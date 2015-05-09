var express = require('express'), 
	app 	= express();

app
	.use(express.static('./app'))
	.get('*',function(req,res){
		res.sendFile(__dirname +'/app/main.html');
	})
	.listen(9000);
