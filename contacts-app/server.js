var express = require('express'), 
	api		= require('./api')
	app 	= express();

app
	.use(express.static('./app'))
	.use('/api',api)
	.get('*',function(req,res){
		res.sendFile(__dirname +'/app/main.html');
	})
	.listen(9000);
