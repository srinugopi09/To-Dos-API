var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _  = require('underscore');

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function (req, res){

	var todoId = parseInt(req.params.id, 10) ;
	var mactchedTodo = _.findWhere(todos, {id: todoId});

	// var mactchedTodo;


	if (mactchedTodo) {
		res.json(mactchedTodo);
	} else {

		console.log(mactchedTodo);
		res.status(404).send();
	}
//res.send('Asking for todo with id of ' + req.params.id);
});

//POST /todos
app.post('/todos', function (req,res) {
var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send("Bad Request");
	}

	body.description = body.description.trim();	
	body.id = todoNextId++;

	todos.push(body);
	
	res.json(body);

})





app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});