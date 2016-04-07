var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Going Gorcery Shopping',
	isCompleted: false
},
{
	id: 2,
	description:'Meet Mom for Lunch',
	isCompleted:true,
},
{
	id: 3,
	description: 'Read a Book',
	isCompleted: false
}];

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





app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});