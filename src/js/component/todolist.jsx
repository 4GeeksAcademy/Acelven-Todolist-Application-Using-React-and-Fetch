import React from "react";
import { Button, Card, Form } from 'react-bootstrap';




function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    
  ]);

  

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/acelven', {
        
        method: 'PUT',
        body: JSON.stringify(newTodos),
        headers: {
          
          'Content-Type': 'application/json'
        }
        
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/acelven', {
        
    method: 'PUT',
    body: JSON.stringify(newTodos),
    headers: {
     
      'Content-Type': 'application/json'
    }
    
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

  const removeAll = index => {
    const newTodos = [...todos];
    newTodos.splice(index.lenght);
    setTodos(newTodos);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/acelven', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                removeAll={removeAll}
                />
              </Card.Body>
            </Card>
          ))}
          
        </div>
        <Button variant="danger" onClick={removeAll}>
  Delete All
</Button>

      </div>
    </div>
  );
}

export default App;