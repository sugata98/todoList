var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/todolist';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var todoSchema = new mongoose.Schema({
	task: String,
	isCompleted: {
		type: Boolean,
		default: false
	}
});

var Todo = mongoose.model('Todo', todoSchema);
// var todoList = [ 'Complete frontend', 'Start Backend', 'Course Revision' ];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
	Todo.find({}, function(err, todoList) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { todoList: todoList });
		}
	});
});

app.post('/newtodo', function(req, res) {
	var newItem = new Todo({
		task: req.body.item
	});
	Todo.create(newItem, function(err, Todo) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

app.put('/newtodo/:id', function(req, res) {
	Todo.findById(req.params.id, function(err, todo) {
		if (err) {
			console.log(err);
		} else {
			if (todo.isCompleted) todo.isCompleted = false;
			else todo.isCompleted = true;
			todo.save();
			res.redirect('/');
		}
	});
});

app.delete('/newtodo/:id', function(req, res) {
	console.log(req.params.id);
	Todo.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			consloe.log(err);
		} else {
			res.redirect('/');
		}
	});
});

app.get('*', function(req, res) {
	res.send('<h1>Invalid Page</h1>');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('TODO Server Has Started!');
});
