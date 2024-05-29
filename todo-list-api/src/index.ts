// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let nextId = 1;

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get a single todo by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// Create a new todo
app.post('/todos', (req, res) => {
  const { title, completed } = req.body;
  const newTodo: Todo = { id: nextId++, title, completed: completed || false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update an existing todo by ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], title, completed };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).send('Todo not found');
  }
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.json(deletedTodo);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
