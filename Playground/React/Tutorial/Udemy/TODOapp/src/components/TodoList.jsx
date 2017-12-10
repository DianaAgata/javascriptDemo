import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

const TodoList = ({todos, showDone}) => (
    <ul>
        {todos.map(todo =>(
            <li key={todo.id}>{todo.text}</li>
            ))}
    </ul>
);

const mapStateToProps = (state) =>({
        todos: state.todos,
        showDone: state.showDone
    });

export default connect(mapStateToProps)(TodoList);