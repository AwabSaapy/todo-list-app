import React from 'react';
import TodosContainer from "./modules/todos/containers/todos/todos.container";
import './App.scss';

const App = () => {
    return (
        <div className="App">
            <h1 className="todo-title"> Todo List </h1>
            <TodosContainer />
        </div>
    )
}

export default App;
