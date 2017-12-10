import React from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import ShowDoneToggle from './ShowDoneToggle';

const App = () => (
    <div>
        <h1>React Tdodo</h1>
        <TodoList/>
        <TodoInput/>
        <ShowDoneToggle/>
    </div>
);

export default App;