var express = require('express'), 
	api		= require('./api')
	app 	= express();

app
	.use(express.static('./dest'))
	.use('/api',api)
	.get('*',function(req,res){
		res.sendFile(__dirname +'/dest/main.html');
	})
	.listen(9000);
