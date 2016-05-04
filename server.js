var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');

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
	var mactchedTodo;

	// Iterate of todos array. Find the match.
	todos.forEach( function (todo) {

		console.log(todoId);

		if (todoId === todo.id) {

			mactchedTodo = todo;
		}
	});
	if (mactchedTodo) {
		res.json(mactchedTodo);
	} else {

		console.log(mactchedTodo);
		res.status(404).send();
	}
//res.send('Asking for todo with id of ' + req.params.id);
});

//POST /todos/:id
app.post('/todos', function (req,res) {

	var body = req.body;
	body.id = todoNextId;
	todoNextId += todoNextId;

	todos.push(body);

	res.send(body);

})





app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});